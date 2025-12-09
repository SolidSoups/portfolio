#include ./random.glsl

// voronoi or worley noise, good for organic cell like noise
float worleyNoise(vec2 uv, float scale){
    vec2 p = uv * scale;
    vec2 i = floor(p);
    vec2 f = fract(p);

    float minDist = 1.0;
    for(int y=-1; y<=1; y++){
        for(int x=-1; x<=1; x++){
            vec2 neighbour = vec2(float(x), float(y));
            vec2 point = random_pcg3d(uvec3( 
                        uint(i.x + float(x)),
                        uint(i.y + float(y)),
                        7u )).xy;
            vec2 diff = neighbour + point - f;
            float dist = length(diff);
            minDist = min(minDist, dist);
        }
    }
    return minDist;
}
