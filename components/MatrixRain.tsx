import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    const chars = '01010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');

    const initRain = () => {
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      columns = Math.ceil(canvas.width / fontSize);
      drops = [];
      // Initialize with random positions to cover screen immediately
      const maxDrops = Math.ceil(canvas.height / fontSize);
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * maxDrops);
      }
    };

    // Initial setup
    initRain();

    const draw = () => {
      // Use semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        // Add some color variation
        const isWhite = Math.random() > 0.98;
        ctx.fillStyle = isWhite ? '#FFF' : '#003300';
        
        // Randomly render neon green characters
        if (Math.random() > 0.9) {
             ctx.fillStyle = '#0aff0a';
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Use ResizeObserver to handle dynamic height changes of the parent section
    const resizeObserver = new ResizeObserver(() => {
        initRain();
    });

    if (parent) {
        resizeObserver.observe(parent);
    }

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />;
};

export default MatrixRain;