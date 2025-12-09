import { useState, useEffect } from 'react';

// handles plane dimensions and resize listener
export function useResponsivePlane(planeHeight = 2) {
    const [planeDimensions, setPlaneDimensions] = useState(() => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const planeWidth = planeHeight * aspectRatio;
        return [planeWidth, planeHeight];
    });

    useEffect(() => {
        const handleResize = () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const planeWidth = planeHeight * aspectRatio;
            setPlaneDimensions([planeWidth, planeHeight]);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [planeHeight]);

    return planeDimensions;
}
