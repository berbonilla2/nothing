import React, { useEffect, useRef, useState } from 'react';

function OrbitalNav({ sections, activeSection, onNavigate }) {
  const navRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const maxOffset = 120;
      const progress = Math.min(window.scrollY / 600, 1);
      const offset = progress * maxOffset;
      nav.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`orbital-nav ${isCollapsed ? 'orbital-nav--collapsed' : ''}`}
      aria-label="Section navigation"
    >
      <button
        type="button"
        className="orbital-nav__core"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
      >
        {isCollapsed ? '···' : 'Map'}
      </button>
      {sections.map((section, index) => {
        const angle = (index / sections.length) * Math.PI * 2;
        const radius = isCollapsed ? 0 : 70;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            className={`orbital-nav__node ${isActive ? 'orbital-nav__node--active' : ''}`}
            style={{
              '--x': `${x}px`,
              '--y': `${y}px`,
              opacity: isCollapsed ? 0 : 1,
              pointerEvents: isCollapsed ? 'none' : 'auto'
            }}
            onClick={() => onNavigate(section.id)}
          >
            <span className="orbital-nav__label">{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default OrbitalNav;


