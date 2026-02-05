import React, { useEffect, useRef } from 'react';

const CircuitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    
    let nodes: { x: number; y: number; connections: number[]; pulse: number }[] = [];
    let animationId: number;

    const initCircuit = () => {
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Create nodes
      const nodeCount = Math.floor((canvas.width * canvas.height) / 40000);
      nodes = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
        });
      }

      // Create connections
      nodes.forEach((node, i) => {
        const nearbyNodes = nodes
          .map((n, j) => ({ index: j, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
          .filter(n => n.index !== i && n.dist < 150)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);
        
        node.connections = nearbyNodes.map(n => n.index);
      });
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() / 1000;

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          const target = nodes[j];
          const pulseIntensity = Math.sin(time * 2 + node.pulse) * 0.5 + 0.5;
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(0, 243, 255, ${0.05 + pulseIntensity * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulseIntensity = Math.sin(time * 3 + node.pulse) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2 + pulseIntensity * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${0.3 + pulseIntensity * 0.4})`;
        ctx.fill();
        
        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4 + pulseIntensity * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${0.05 + pulseIntensity * 0.1})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    initCircuit();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      initCircuit();
    });

    if (parent) {
      resizeObserver.observe(parent);
    }

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />;
};

export default CircuitBackground;
