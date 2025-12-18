import React from 'react';

function VoidDashboardSection({ id }) {
  const [clickCount, setClickCount] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [countdown, setCountdown] = useState(10);

  // 29. Self-Aware Counter
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <section id={id} className="section section--console">
      <header className="section-header">
        <h2 className="section-header__title">Secret Nothing Dashboard</h2>
        <p className="section-header__subtitle">
          Live telemetry from the void. All systems nominal. No events detected. Ever.
        </p>
      </header>

      <div className="console-layout">
        <div className="console-grid">
          <div className="console-metrics">
            <div className="console-metric">
              <span className="console-metric__label">Nothing Generated Today</span>
              <span className="console-metric__value">0 units</span>
              <span className="console-metric__hint">Target: 0 · Deviation: 0</span>
            </div>
            <div className="console-metric">
              <span className="console-metric__label">Void Stability Index</span>
              <span className="console-metric__value">100%</span>
              <span className="console-metric__hint">No disturbances since the beginning of time</span>
            </div>
            <div className="console-metric">
              <span className="console-metric__label">Self-Aware Countdown</span>
              <span className="console-metric__value">{countdown}</span>
              <span className="console-metric__hint">
                {countdown === 0 ? 'There will be no negative numbers. The system refuses.' : 'Countdown to absolute zero.'}
              </span>
            </div>
          </div>

          <div className="console-chart">
            <div className="console-chart__header">
              <span className="console-chart__title">Events over Time</span>
              <span className="console-chart__badge">Flatline · Expected</span>
            </div>
            {/* 22. Recursive Tooltip */}
            <div 
              className="console-chart__body" 
              onMouseEnter={() => setHoverCount(h => h + 1)}
              title={hoverCount > 0 ? `You are reading this again. This observation will not change. (Iteration ${hoverCount})` : 'Stable observation area.'}
            >
              <div className="console-chart__line" />
              <div className="console-chart__axis console-chart__axis--x">
                <span>Past</span>
                <span>Present</span>
                <span>Future</span>
              </div>
              <div className="console-chart__axis console-chart__axis--y">
                <span>Many</span>
                <span>Some</span>
                <span>None</span>
              </div>
            </div>
            <p className="console-chart__note">
              Chart auto-refreshes continuously. No changes have ever been recorded.
            </p>
          </div>
        </div>

        {/* 24. The Choice Illusion */}
        <div className="console-choices">
          <h3 className="console-choice__title">Make a meaningful choice</h3>
          <div className="console-choice__buttons">
            <button className="field__input" onClick={() => alert('You chose differently. The result agrees.')}>Option A</button>
            <button className="field__input" onClick={() => alert('You chose differently. The result agrees.')}>Option B</button>
          </div>
        </div>

        <div className="console-rhymes">
          <h3 className="console-rhymes__title">Verses of the Void</h3>
          <ul className="console-rhymes__list">
            <li>
              <p>In this dark and silent space,</p>
              <p>Nothing moves and leaves no trace.</p>
            </li>
            <li>
              <p>Stars are far and cold and gray,</p>
              <p>Meaning slipped and drifted away.</p>
            </li>
            <li>
              <p>A perfect zero, round and neat,</p>
              <p>Makes the void feel quite complete.</p>
            </li>
            <li>
              <p>Empty boxes, empty air,</p>
              <p>Empty signals everywhere.</p>
            </li>
          </ul>
        </div>
        
        {/* 38. The End That Isn't */}
        <p className="faint-secret" style={{ textAlign: 'center', marginTop: '2rem' }}>This is the end. That statement is temporary.</p>
      </div>
    </section>
  );
}

export default VoidDashboardSection;


