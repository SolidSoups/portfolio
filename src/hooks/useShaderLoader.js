import { useState, useEffect } from 'react';

export function useShaderLoader(shaderModule, modulePath) {
    const [shaders, setShaders] = useState(() => {
        return {
            vertex: shaderModule.vertex,
            fragment: shaderModule.fragment,
        };
    });

    // HMR support
    useEffect(() => {
        if (import.meta.hot && modulePath) {
            import.meta.hot.accept(modulePath, (newModule) => {
                const updated = newModule.default;
                if (newModule) {
                    setShaders({
                        fragment: updated.fragment,
                        vertex: updated.vertex,
                    });
                }
            });
        }
    }, [modulePath]);

    return shaders;
}
