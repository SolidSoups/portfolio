import * as THREE from 'three';

export const domainWarpingConfig = {
    controls: {
        chromaticShift: { value: 0.03, min: 0, max: 0.1, step: 0.001 },
        zoom: { value: 1.0, min: 0.1, max: 10.0, step: 0.01 },
        speedIncrease: { value: 1.31, min: 0.1, max: 10.0, step: 0.01 },
        offsetX: { value: 3.94, min: 0.0, max: 20.0, step: 0.01 },
        offsetY: { value: 0.0, min: 0.0, max: 20.0, step: 0.01 },
    },
    uniforms: {
        initial: {
            u_time: { value: 0 },
            u_width: { value: window.innerWidth },
            u_height: { value: window.innerHeight },
            u_aspect: { value: window.innerWidth / window.innerHeight },
            u_chromatic_shift: { value: 0.025 },
            u_zoom: { value: 1.0 },
            u_offset: { value: new THREE.Vector2(0, 0) },
        },
        update: (material, { clock, size, controls }) => {
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
        },
    },
};
