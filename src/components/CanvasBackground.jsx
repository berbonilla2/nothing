import React, { useEffect, useRef } from 'react';

function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    }));

    let frameId;
    let speedMultiplier = 1;
    const mouse = { x: width / 2, y: height / 2, active: false };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    const handlePointerMove = event => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handleCalibration = event => {
      if (event.detail && typeof event.detail.speed === 'number') {
        speedMultiplier = event.detail.speed;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('void-calibration-change', handleCalibration);

    const render = () => {
      frameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(9, 9, 11, 1)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        let vx = a.vx * speedMultiplier;
        let vy = a.vy * speedMultiplier;

        if (mouse.active) {
          const dxm = mouse.x - a.x;
          const dym = mouse.y - a.y;
          const distMouse = Math.sqrt(dxm * dxm + dym * dym) || 1;
          const influence = Math.max(0, 120 - distMouse) / 120;
          vx += (dxm / distMouse) * influence * 0.12;
          vy += (dym / distMouse) * influence * 0.12;
        }

        a.x += vx;
        a.y += vy;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const opacity = 1 - dist / 160;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(226, 232, 240, 0.8)';
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('void-calibration-change', handleCalibration);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      ctx.clearRect(0, 0, width, height);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background" aria-hidden="true" />;
}

export default CanvasBackground;


