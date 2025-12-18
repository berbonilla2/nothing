import React, { useEffect } from 'react';

function Layout({ children }) {
  useEffect(() => {
    // 18. Double-Click Easter Egg
    const handleDblClick = () => {
      alert('Please do not disturb the nothing.');
    };
    window.addEventListener('dblclick', handleDblClick);
    return () => window.removeEventListener('dblclick', handleDblClick);
  }, []);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frameId;

    const handleMove = event => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const handleEnter = () => {
      cursor.classList.add('custom-cursor--visible');
    };

    const handleLeave = () => {
      cursor.classList.remove('custom-cursor--visible');
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerenter', handleEnter);
    window.addEventListener('pointerleave', handleLeave);
    animate();

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerenter', handleEnter);
      window.removeEventListener('pointerleave', handleLeave);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      cursor.remove();
    };
  }, []);

  return (
    <div className="app-shell">
      {/* 10. Very Small Text */}
      <span className="tiny-secret">You are looking very closely for something that is not here.</span>
      {/* 36. Unreadable Truth */}
      <span className="faint-secret">It is better this way.</span>

      <header className="app-shell__header">
        <div className="brand-mark">
          <span className="brand-mark__symbol">◎</span>
          <span className="brand-mark__text">Void Observation Console</span>
        </div>
        <div className="brand-meta">
          <span className="brand-meta__role">Status: Stable Emptiness</span>
          <span className="brand-meta__location">Location: Deep Space (Everywhere)</span>
        </div>
      </header>
      {children}
      <footer className="app-shell__footer">
        <div className="footer-credits">
          <span>
            Void observation protocols adapted from the BJIP initiative | Character is fictional and
            satire created for seminar activity compliance.
          </span>
          {/* 20. Credits Line Easter Egg */}
          <span className="footer-secret">Created by BPJ | Assisted by the void.</span>
        </div>
        {/* 1. Footer Easter Egg */}
        <div className="footer-end-egg">
          <p>You have reached the end.</p>
          <p>There is no more content.</p>
          <p>This is not a loading issue.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;


