import React from 'react';

const memos = [
  {
    id: 1,
    time: '00:00:00 UTC',
    message: 'Universe initialized. No content scheduled. Auth signature: BJIP seed.'
  },
  {
    id: 2,
    time: '04:32:10 UTC',
    message: 'Status check: still empty. Recommend continuing current strategy.'
  },
  {
    id: 3,
    time: '13.8B years later',
    message: 'No critical issues detected. No non-critical issues detected either.'
  },
  {
    id: 4,
    time: 'Now',
    message: 'An observer connected to the system. Control unit BJIP has taken careful note of this non-event.'
  }
];

function MemosSection({ id }) {
  return (
    <section id={id} className="section section--memos">
      <header className="section-header">
        <h2 className="section-header__title">Internal Memos from the Universe</h2>
        <p className="section-header__subtitle">
          System logs from a cosmos that has nothing urgent to report.
        </p>
      </header>

      <div className="memos-log">
        {memos.map(memo => (
          <article key={memo.id} className="memo-entry">
            <header className="memo-entry__header">
              <span className="memo-entry__time">{memo.time}</span>
              <span className="memo-entry__tag">INFO</span>
            </header>
            <p className="memo-entry__body">{memo.message}</p>
          </article>
        ))}
        <div className="memo-entry memo-entry--latest">
          <header className="memo-entry__header">
            <span className="memo-entry__time">Next</span>
            <span className="memo-entry__tag memo-entry__tag--idle">IDLE</span>
          </header>
          <p className="memo-entry__body">
            Awaiting further developments. Historical data suggests none are forthcoming.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MemosSection;


