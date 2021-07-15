import React from 'react';
import { useRef, useEffect } from 'react';

const CanvasAnim = React.forwardRef(({draw, height, width}, ref) => {
    if (ref === undefined)
        ref = useRef();

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        
        let last = Date.now();
        let lastFrame;
        const render = () => {
            const now = Date.now();
            const deltaTime = now - last; // time since last frame in miliseconds
            last = now;
            lastFrame = draw(ctx, deltaTime, lastFrame);
            animationFrameId = window.requestAnimationFrame(render); // recursive loop
        };
        render(); // loop start

        return () => {
            console.log('clean up, animation stop');
            window.cancelAnimationFrame(animationFrameId)
        };

    }, [draw]);

    return (
        <canvas className='bg' height={height} width={width} ref={ref}>Canvas not supported</canvas>
    );
});

export default CanvasAnim;