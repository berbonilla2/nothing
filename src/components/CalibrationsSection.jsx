import React, { useState } from 'react';

function CalibrationsSection({ id }) {
  const [speed, setSpeed] = useState(1);

  const handleSpeedChange = event => {
    const value = Number(event.target.value);
    setSpeed(value);
    window.dispatchEvent(
      new CustomEvent('void-calibration-change', {
        detail: { speed: value }
      })
    );
  };

  return (
    <section id={id} className="section section--lab">
      <header className="section-header">
        <h2 className="section-header__title">Void Calibration Lab</h2>
        <p className="section-header__subtitle">
          Adjust how eagerly the background responds to your presence. All settings are cosmetic,
          all seriousness is optional.
        </p>
      </header>

      <div className="lab-layout">
        <div className="lab-control">
          <label className="field">
            <span className="field__label">Particle drift responsiveness</span>
            <input
              className="field__input"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
            />
          </label>
          <p className="lab-control__hint">
            Current factor: <strong>{speed.toFixed(1)}</strong> · Higher values cause the nodes to
            lean more dramatically toward your cursor.
          </p>
        </div>
        <div className="lab-aside">
          <p className="lab-aside__body">
            According to internal documents, this calibration interface was added late in the
            project by an entity identified only as BJIP. Officially, it does nothing critical.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CalibrationsSection;


