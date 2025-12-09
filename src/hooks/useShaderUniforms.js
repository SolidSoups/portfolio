import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export function useShaderUniforms(initialUniforms, updateFn) {
    const materialRef = useRef();
    const uniforms = useMemo(() => initialUniforms, []);

    useFrame((state) => {
        if (materialRef.current) {
            updateFn(materialRef.current, state);
        }
    });

    return { uniforms, materialRef };
}
