import { Canvas } from '@react-three/fiber';

export default function ShaderBackground({ children }) {
    return (
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
            <Canvas camera={{ position: [0, 0, 1] }}>{children}</Canvas>
        </div>
    );
}
