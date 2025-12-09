import { useControls } from 'leva';
import { useResponsivePlane } from '../hooks/useResponsivePlane';
import { useShaderLoader } from '../hooks/useShaderLoader';
import { useShaderUniforms } from '../hooks/useShaderUniforms';

export default function ShaderCanvas({
    shader,
    shaderPath,
    controlsConfig,
    uniformsConfig,
}) {
    const planeDimensions = useResponsivePlane(2);
    const shaders = useShaderLoader(shader, shaderPath);
    const controls = useControls(controlsConfig);

    const { uniforms, materialRef } = useShaderUniforms(
        uniformsConfig.initial,
        (material, { clock, size }) => {
            uniformsConfig.update(material, { clock, size, controls });
        }
    );

    return (
        <mesh>
            <planeGeometry args={planeDimensions} />
            <shaderMaterial
                key={shaders.vertex + shaders.fragment}
                ref={materialRef}
                vertexShader={shaders.vertex}
                fragmentShader={shaders.fragment}
                uniforms={uniforms}
            />
        </mesh>
    );
}
