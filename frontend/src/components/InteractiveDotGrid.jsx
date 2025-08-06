import React, { useEffect, useRef } from 'react';

const InteractiveDotGrid = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const dotSize = 4;
        const gap = 30;

        const createGrid = () => {
            grid.innerHTML = '';

            const numCols = Math.floor(window.innerWidth / (dotSize + gap));
            const numRows = Math.floor(window.innerHeight / (dotSize + gap));

            grid.style.setProperty('--num-cols', numCols);
            grid.style.setProperty('--num-rows', numRows);
            grid.style.setProperty('--dot-size', `${dotSize}px`);
            grid.style.setProperty('--gap', `${gap}px`);

            for (let i = 0; i < numCols * numRows; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                grid.appendChild(dot);
            }
        };

        createGrid();

        const dots = Array.from(grid.children);

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            dots.forEach((dot) => {
                const rect = dot.getBoundingClientRect();
                const dotX = rect.left + dotSize / 2;
                const dotY = rect.top + dotSize / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2)
                );

                const radius = 300; 

                if (distance < radius) {
                    const scale = (radius - distance) / radius;
                    dot.style.transform = `scale(${1 + scale * 2.5})`;
                    dot.style.opacity = `${scale}`;
                    dot.style.backgroundColor = '#ffffff';
                } else {
                    dot.style.transform = 'scale(1)';
                    dot.style.opacity = '0';
                    dot.style.backgroundColor = '#4a5568';
                }
            });
        };
        
        const handleResize = () => {
            createGrid();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <style>
                {`
                    .dot-grid {
                        display: grid;
                        grid-template-columns: repeat(var(--num-cols), 1fr);
                        grid-template-rows: repeat(var(--num-rows), 1fr);
                        gap: var(--gap);
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 0;
                    }

                    .dot {
                        width: var(--dot-size);
                        height: var(--dot-size);
                        background-color: #4a5568;
                        border-radius: 50%;
                        opacity: 0;
                        transition: transform 0.2s ease-out, opacity 0.2s ease-out, background-color 0.2s ease-out;
                    }
                `}
            </style>
            <div ref={gridRef} className="dot-grid"></div>
        </>
    );
};

export default InteractiveDotGrid;