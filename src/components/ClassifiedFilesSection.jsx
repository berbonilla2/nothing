import React from 'react';

const files = [
  {
    id: 'BJIP-0001',
    title: 'Protocol for Maintaining the Void',
    summary: 'Standard operating procedures for ensuring nothing continues to happen.'
  },
  {
    id: 'BJIP-0002',
    title: 'Incident Report: Nothing Happened',
    summary: 'Comprehensive documentation of a non-event that met all non-criteria.'
  },
  {
    id: 'BJIP-0003',
    title: 'Future Roadmap for Nothing',
    summary: 'Strategic initiatives for scaling the absence of meaningful change.'
  }
];

function ClassifiedFilesSection({ id }) {
  return (
    <section id={id} className="section section--files">
      <header className="section-header">
        <h2 className="section-header__title">Classified Space Files</h2>
        <p className="section-header__subtitle">
          Clearance granted. Contents remain, by design, almost completely redacted.
        </p>
      </header>

      <div className="files-grid">
        {files.map(file => (
          <article key={file.id} className="file-card">
            <header className="file-card__header">
              <span className="file-card__id">FILE {file.id}</span>
              <h3 className="file-card__title">{file.title}</h3>
            </header>
            <p className="file-card__summary">{file.summary}</p>
            <div className="file-card__body">
              <p className="file-card__redacted" aria-label="Redacted content">
                ██████████████████████████████████████████████████████████████████████
              </p>
              <p className="file-card__redacted" aria-hidden="true">
                ██████████████████ this line intentionally contains nothing ███████████
              </p>
            </div>
            <p className="file-card__footer">Access level: maximum. Information density: minimal.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ClassifiedFilesSection;


