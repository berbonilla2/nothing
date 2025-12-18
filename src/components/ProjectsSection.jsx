import React from 'react';

const voidFeatures = [
  {
    _id: 'void-1',
    title: 'Featured Nothing · Sector 0-0-0',
    description: 'A meticulously monitored region of space where absolutely nothing has occurred.',
    role: 'Status',
    stack: ['Confirmed Empty', 'No Signals', 'Stable Silence']
  },
  {
    _id: 'void-2',
    title: 'Black Box of No Events',
    description: 'A secured archive preserving a perfect record of everything that never happened.',
    role: 'Archive',
    stack: ['0 Logs', '0 Incidents', '0 Action Items']
  },
  {
    _id: 'void-3',
    title: 'Silence Detector v∞',
    description:
      'An over-engineered device that listens intently and reports ongoing nothingness. Device markings reference an unreadable acronym: BJIP.',
    role: 'Instrumentation',
    stack: ['Continuous Scan', 'No Anomalies', 'Indefinite Uptime']
  }
];

function ProjectsSection({ id }) {

  return (
    <section id={id} className="section section--projects">
      <header className="section-header">
        <h2 className="section-header__title">Featured Nothing</h2>
        <p className="section-header__subtitle">
          A curated selection of non-events, quiet sectors, and highly stable empty spaces.
        </p>
      </header>

      <div className="project-grid">
        {voidFeatures.map(item => (
          <article key={item._id} className="project-card">
            <div className="project-card__rail" />
            <h3 className="project-card__title">{item.title}</h3>
            <p className="project-card__description">{item.description}</p>
            <dl className="project-card__meta">
              {item.role && (
                <>
                  <dt>Role</dt>
                  <dd>{item.role}</dd>
                </>
              )}
              {item.stack && item.stack.length > 0 && (
                <>
                  <dt>Stack</dt>
                  <dd>{item.stack.join(' · ')}</dd>
                </>
              )}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;


