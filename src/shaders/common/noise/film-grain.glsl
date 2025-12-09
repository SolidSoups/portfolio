#include ./random.glsl

float filmGrain(vec2 uv, float time, int width){
    vec2 seed = uv * float(width);
    seed = floor(seed);
    uvec3 p = uvec3(uint(seed.x), uint(seed.y), uint(time * 24.0));
    vec3 rand = random_pcg3d(p);
    float grain = (rand.x + rand.y + rand.z) / 3.0 - 0.5;
    grain = grain * 0.15 + 0.5;
    return grain;
}
