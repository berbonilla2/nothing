import React from 'react';

const HEADLINE_TEXT = 'Welcome to the edge of the observable nothing.';

function Hero({ id }) {

  return (
    <section id={id} className="section section--hero">
      <div className="hero-grid">
        <div className="hero-grid__primary">
          <h1 className="hero-headline">{HEADLINE_TEXT}</h1>
          {/* 23. The Almost Message */}
          <p className="almost-message">There is something you need to—</p>
          <p className="hero-subtitle">
            This interface was commissioned to monitor the most stable phenomenon in existence:
            nothing. It is operating well within expected levels of emptiness.
          </p>
          {/* 2. Hover-Only Text */}
          <div className="hover-secret" title="Still nothing.">
            <div className="hero-meta">
              <div className="hero-meta__column">
                <span className="hero-meta__label">Current reading</span>
                <span className="hero-meta__value">
                  Observable events: 0 · Anomalies: 0 · Urgent alerts: 0
                </span>
                <span className="hero-meta__value">
                  This page updates continuously to confirm that nothing has changed.
                </span>
              </div>
              <div className="hero-meta__column">
                <span className="hero-meta__label">System purpose</span>
                <span className="hero-meta__value">
                  Present the void with maximum seriousness and minimum content.
                </span>
                <span className="hero-meta__value">
                  If you are looking for meaning, this system will not stop you. It will simply not
                  help.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-grid__secondary">
          <div className="hero-orbit">
            <div className="hero-orbit__core">◎</div>
            <div className="hero-orbit__ring hero-orbit__ring--front" aria-hidden="true" />
            <div className="hero-orbit__ring hero-orbit__ring--mid" aria-hidden="true" />
            <div className="hero-orbit__ring hero-orbit__ring--back" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


