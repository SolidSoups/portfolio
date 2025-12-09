import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';
import { useResponsivePlane } from './hooks/useResponsivePlane';
import { useShaderLoader } from './hooks/useShaderLoader';
import DomainWarpingShader from './shaders/domain-warping';
import { useShaderUniforms } from './hooks/useShaderUniforms';

import './App.css';

function World() {
    const planeDimensions = useResponsivePlane(2);
    const shaders = useShaderLoader(
        DomainWarpingShader,
        './shaders/domain-warping'
    );
    const controls = useControls({
        chromaticShift: { value: 0.03, min: 0, max: 0.1, step: 0.001 },
        zoom: { value: 1.0, min: 0.1, max: 10.0, step: 0.01 },
        speedIncrease: { value: 1.31, min: 0.1, max: 10.0, step: 0.01 },
        offsetX: { value: 3.94, min: 0.0, max: 20.0, step: 0.01 },
        offsetY: { value: 0.0, min: 0.0, max: 20.0, step: 0.01 },
    });

    const { uniforms, materialRef } = useShaderUniforms(
        {
            u_time: { value: 0 },
            u_width: { value: window.innerWidth },
            u_height: { value: window.innerHeight },
            u_aspect: { value: window.innerWidth / window.innerHeight },
            u_chromatic_shift: { value: 0.025 },
            u_zoom: { value: 1.0 },
            u_offset: { value: new THREE.Vector2(0, 0) },
        },
        (material, { clock, size }) => {
            const aspectRatio = size.width / size.height;

            material.uniforms.u_time.value =
                clock.getElapsedTime() * controls.speedIncrease;
            material.uniforms.u_width.value = size.width;
            material.uniforms.u_height.value = size.height;
            material.uniforms.u_aspect.value = aspectRatio;
            material.uniforms.u_chromatic_shift.value = controls.chromaticShift;
            material.uniforms.u_zoom.value = controls.zoom;
            material.uniforms.u_offset.value.set(
                controls.offsetX,
                controls.offsetY
            );
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

export default function App() {
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            >
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <World />
                </Canvas>
            </div>
            <div
                className="content"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <h1>Hello World</h1>
            </div>
        </>
    );
}
