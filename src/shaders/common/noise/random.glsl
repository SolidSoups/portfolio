
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
    float phi = 2.0 * M_PI * uv[0];
    return vec2(cos(phi), sin(phi));
}
