#include ./random.glsl

float perlin(vec2 pos, float gridSize){
    vec2 gridPos = pos * gridSize;
    vec2 i = floor(gridPos);
    uvec2 ui = uvec2(int(i.x), int(i.y));
    vec2 f = fract(gridPos);

    vec2 f00 = randomGradient(uvec3(ui.x,       ui.y, 1u));
    vec2 f10 = randomGradient(uvec3(ui.x+1u,    ui.y, 1u));
    vec2 f01 = randomGradient(uvec3(ui.x,       ui.y+1u, 1u));
    vec2 f11 = randomGradient(uvec3(ui.x+1u,    ui.y+1u, 1u));

    float d00 = dot(f00, f);
    float d10 = dot(f10, f - vec2(1.0, 0.0));
    float d01 = dot(f01, f - vec2(0.0, 1.0));
    float d11 = dot(f11, f - vec2(1.0, 1.0));

    vec2 u = f * f * f * (f * ( f * 6.0 - 15.0) + 10.0);

    float nx0 = mix(d00, d10, u.x);
    float nx1 = mix(d01, d11, u.x);
    return mix(nx0, nx1, u.y);
}
