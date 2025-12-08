uniform float u_time;
uniform int u_width;
uniform int u_height;
uniform float u_aspect;
uniform float u_chromatic_shift;
varying vec2 vUv;

// deterministic pseudo-random
// 'hash-functions for gpu rendering'
vec3 random_pcg3d(uvec3 v){
    v = v * 1664525u + 1013904223u;
    v.x += v.y*v.z; v.y += v.z*v.x; v.z += v.x*v.y;
    v ^= v >> 16u;
    v.x += v.y*v.z; v.y += v.z*v.x; v.z += v.x*v.y;
    return vec3(v) * (1.0/float(0xffffffffu));
}

#define M_PI 3.1415926533897932384626433832795
vec2 randomGradient(uvec3 p){
    vec3 uv = random_pcg3d(p);
    float r = sqrt(uv[0]);
    float phi = 2.0 * M_PI * uv[1];
    return vec2(r * cos(phi), r * sin(phi));
}

// basically high frequency noise
float filmGrain(vec2 uv, float time){
    vec2 seed = uv * float(u_width);
    seed = floor(seed);

    // temporal variation for animated grain
    uvec3 p  = uvec3(uint(seed.x), uint(seed.y), uint(time * 24.0));
    vec3 rand = random_pcg3d(p);

    // gaussian-like distribution
    float grain = rand.x + rand.y - 1.0;
    grain = grain * 0.5 + 0.5;

    grain = mix(0.5, grain, 0.15);

    return grain;
}

float blueNoise(vec2 uv, float scale){
    vec2 p = uv * scale;
    vec2 i = floor(p);
    vec2 f = fract(p);

    float minDist = 1.0;
    for(int y = -1; y <= 1; y++){
        for(int x = -1; x <= 1; x++){
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random_pcg3d(uvec3(uint(i.x + float(x)), uint(i.y + float(y)), 7u)).xy;
            point = 0.5 + 0.5 * sin(6.2831 * point);
            vec2 diff = neighbor + point - f;
            float dist = length(diff);
            minDist = min(minDist, dist);
        }

    }
    return minDist;
}


float perlin(vec2 pos, float gridSize){
    vec2 gridPos = pos * gridSize;
    vec2 i = floor(gridPos);
    vec2 f = floor(gridPos);

    uvec2 ui = uvec2(int(i.x), int(i.y));

    vec2 f00 = randomGradient(uvec3(ui.x,     ui.y, 1u));
    vec2 f01 = randomGradient(uvec3(ui.x+1u,  ui.y, 1u));
    vec2 f10 = randomGradient(uvec3(ui.x,     ui.y+1u, 1u));
    vec2 f11 = randomGradient(uvec3(ui.x+1u,  ui.y+1u, 1u));

    float d00 = dot(f00, f);
    float d01 = dot(f01, f - vec2(1.0, 0.0));
    float d10 = dot(f10, f - vec2(0.0, 1.0));
    float d11 = dot(f11, f - vec2(1.0, 1.0));

    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    float nx0 = mix(d00, d10, u.x);
    float nx1 = mix(d01, d11, u.x);
    return mix(nx0, nx1, u.y);
}

float gradientNoise(vec2 pos, float gridSize){
    vec2 gridPos = pos * gridSize;
    vec2 i = floor(gridPos);
    vec2 f = fract(gridPos);

    uvec2 ui = uvec2(int(i.x), int(i.y));

    vec2 g00 = randomGradient(uvec3(ui.x,    ui.y,    1u));
    vec2 g10 = randomGradient(uvec3(ui.x+1u, ui.y,    1u));
    vec2 g01 = randomGradient(uvec3(ui.x,    ui.y+1u, 1u));
    vec2 g11 = randomGradient(uvec3(ui.x+1u, ui.y+1u, 1u));

    float d00 = dot(g00, f);
    float d10 = dot(g10, f - vec2(1.0, 0.0));
    float d01 = dot(g01, f - vec2(0.0, 1.0));
    float d11 = dot(g11, f - vec2(1.0, 1.0));

    // quintic interpolation for smoothness
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    float nx0 = mix(d00, d10, u.x);
    float nx1 = mix(d01, d11, u.x);

    return mix(nx0, nx1, u.y);
}

float getSmoothedGradient(vec2 st, vec2 q, vec2 r, float scale){
    // final noise with warping
    float n = gradientNoise(st + r * 0.5, scale);
    // subtle detail layer after
    n += gradientNoise(st + r * 0.5, scale * 100.0) * 0.0001;

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

    // DOMAIN WARPING
    // we create offsets to distort the uv vectors, creating a warping effect
    float scale = 1.2;
    vec2 q = vec2(
        gradientNoise(st + vec2(-0.5, 0.0) + u_time * 0.02, scale),
        gradientNoise(st + vec2(5.9, 3.6) + u_time * 0.02, scale)
    );
    vec2 r = vec2(
        gradientNoise(st + q * 0.7 + vec2(3.7, -2.9) + u_time * 0.01, scale),
        gradientNoise(st + q * 0.7 + vec2(8.3, 2.8) + u_time * 0.01, scale)
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

    float grain = filmGrain(st, u_time);
    float blue = blueNoise(st, 1024.0);

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
