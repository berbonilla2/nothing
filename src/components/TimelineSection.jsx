import React from 'react';

const timeline = [
  {
    label: 'Premise',
    title: 'Why build a site about nothing?',
    body: 'Because every other site is about something. This one documents the only resource that never runs out: empty space.'
  },
  {
    label: 'Philosophy',
    title: 'Treat the void seriously',
    body: 'Interfaces, metrics, and lore are presented with full dramatic weight, even when they measure absolutely nothing.'
  },
  {
    label: 'Method',
    title: 'Over-instrument the absence',
    body: 'Dashboards, logs, and files monitor a cosmos with no meaningful updates—and proudly report zero, every time.'
  },
  {
    label: 'Rules',
    title: 'No real content',
    body: 'No portfolios, no productivity, no real people. Just a beautifully engineered system for staring into the dark, maintained under an obscure directive known as BJIP.'
  },
  {
    label: 'Outcome',
    title: 'A committed cosmic joke',
    body: 'What remains is a quiet, technically competent monument to nothing in particular.'
  }
];

function TimelineSection({ id }) {
  return (
    <section id={id} className="section section--timeline">
      <header className="section-header">
        <h2 className="section-header__title">About Nothing</h2>
        <p className="section-header__subtitle">
          A short explanation of why this site exists, even though it does not need to.
        </p>
      </header>
      <div className="timeline">
        {timeline.map(item => (
          <article key={item.title} className="timeline-item">
            <div className="timeline-item__marker" />
            <div className="timeline-item__content">
              <span className="timeline-item__label">{item.label}</span>
              <h3 className="timeline-item__title">{item.title}</h3>
              <p className="timeline-item__body">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TimelineSection;


