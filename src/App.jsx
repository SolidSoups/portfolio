import { Canvas } from '@react-three/fiber';
import DomainWarpingShader from './shaders/domain-warping';
import { domainWarpingConfig } from './shaders/domain-warping/config';
import ShaderBackground from './components/ShaderBackground';
import ShaderCanvas from './components/ShaderCanvas';
import './App.css';

export default function App() {
    return (
        <>
            <ShaderBackground>
                <ShaderCanvas
                    shader={DomainWarpingShader}
                    shaderPath="./shaders/domain-warping"
                    controlsConfig={domainWarpingConfig.controls}
                    uniformsConfig={domainWarpingConfig.uniforms}
                />
            </ShaderBackground>
        </>
    );
}
