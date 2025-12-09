uniform float u_time;
uniform int u_width;
uniform int u_height;
uniform float u_aspect;
uniform float u_chromatic_shift;
uniform float u_zoom;
uniform vec2 u_offset;
varying vec2 vUv;

#include ../common/noise/random.glsl
#include ../common/noise/perlin.glsl
#include ../common/noise/film-grain.glsl
#include ../common/noise/worley-noise.glsl

float getSmoothedGradient(vec2 st, vec2 q, vec2 r, float scale){
    // final noise with warping
    float n = perlin(st + r * 0.5, scale);
    // subtle detail layer after
    n += perlin(st + r * 0.5, scale * 100.0) * 0.0001;

    // normalize and smooth
    const float res = 48.0;
    n = n * 0.5 + 0.5;
    n = smoothstep(0.2, 0.9, n);
    n = smoothstep(0.1, 0.9, n);
    n = smoothstep(0.1, 1.5, n);
    n = smoothstep(0.1, 0.9, n);

    return n;
}

vec3 cubicPolynomial(float t, vec3 A, vec3 B, vec3 C, vec3 D){
    return A + t * (B + t * (C + t * D));
}

void main(){
    vec2 uv = vUv;
    vec2 st = uv * vec2(u_aspect, 1.0);
    st *= u_zoom;
    st += u_offset;

    // DOMAIN WARPING
    // we create offsets to distort the uv vectors, creating a warping effect
    float scale = 1.2;
    vec2 q = vec2(
        perlin(st + vec2(-0.5, 0.0) + u_time * 0.02, scale),
        perlin(st + vec2(5.9, 3.6) + u_time * 0.02, scale)
    );
    vec2 r = vec2(
        perlin(st + q * 0.7 + vec2(3.7, -2.9) + u_time * 0.01, scale),
        perlin(st + q * 0.7 + vec2(8.3, 2.8) + u_time * 0.01, scale)
    );
    

    // chromatic aberration
    float n_base = getSmoothedGradient(st, q, r, scale);
    vec2 center = vec2(0.5 * u_aspect, 0.5);
    vec2 offset_dir = normalize(st - center);
    float chromatic_mag = u_chromatic_shift * (1.0 - n_base);
    vec2 r_offset = offset_dir * chromatic_mag * 1.5;
    vec2 b_offset = offset_dir * chromatic_mag * -1.5;

    float n_r = getSmoothedGradient(st + r_offset, q, r, scale);
    float n_g = n_base;
    float n_b = getSmoothedGradient(st + b_offset, q, r, scale);

    vec3 final_color = vec3(n_r, n_g, n_b);

    // film grain application
    const vec3 lumWeights = vec3(0.2126, 0.7152, 0.0722);
    float luminance = dot(final_color, lumWeights);

    float grain = filmGrain(st, u_time, u_width);
    float blue = worleyNoise(st, 1024.0);

    // Less aggressive normalization
    blue = blue * 0.5 + 0.5;

    // combine grains
    float finalGrain = grain * blue;

    // More aggressive grain strength
    float grainStrength = 0.25; // Increased from 0.08

    // Optional: vary by luminance but less restrictively
    grainStrength *= smoothstep(0.0, 0.1, luminance); // Just fade out in pure blacks

    // Apply grain
    final_color *= 1.0 + (finalGrain - 0.5) * grainStrength * 2.0;
    final_color += (finalGrain - 0.5) * grainStrength * 0.15;

    gl_FragColor = vec4(final_color, 1.0);
}
