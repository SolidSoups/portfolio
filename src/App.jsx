import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import vertexShader from '../shaders/gradient.vert.glsl';
import fragmentShader from '../shaders/gradient.frag.glsl';

import './App.css';

function World() {
    const materialRef = useRef();
    const [shaders, setShaders] = useState({
        vertex: vertexShader,
        fragment: fragmentShader,
    });

    // HMR support
    useEffect(() => {
        if (import.meta.hot) {
            import.meta.hot.accept(
                '../shaders/gradient.vert.glsl',
                (newModule) => {
                    if (newModule) {
                        setShaders((prev) => ({
                            ...prev,
                            vertex: newModule.default,
                        }));
                    }
                }
            );

            import.meta.hot.accept(
                '../shaders/gradient.frag.glsl',
                (newModule) => {
                    if (newModule) {
                        setShaders((prev) => ({
                            ...prev,
                            fragment: newModule.default,
                        }));
                    }
                }
            );
        }
    });

    const aspectRatio = window.innerWidth / window.innerHeight;
    const planeHeight = 2;
    const planeWidth = planeHeight * aspectRatio;

    // update shader uniforms every frame
    useFrame(({ clock, size }) => {
        if (materialRef.current) {
            const aspectRatio = size.width / size.height;

            materialRef.current.uniforms.u_time.value =
                clock.getElapsedTime() * 5;
            materialRef.current.uniforms.u_width.value = size.width;
            materialRef.current.uniforms.u_height.value = size.height;
            materialRef.current.uniforms.u_aspect.value = aspectRatio;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[planeWidth, planeHeight]} />
            <shaderMaterial
                key={shaders.vertex + shaders.fragment}
                ref={materialRef}
                vertexShader={shaders.vertex}
                fragmentShader={shaders.fragment}
                uniforms={{
                    u_time: { value: 0 },
                    u_width: { value: window.innerWidth },
                    u_height: { value: window.innerHeight },
                    u_aspect: { value: window.innerWidth / window.innerHeight },
                    u_chromatic_shift: { value: 0.025 },
                }}
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
