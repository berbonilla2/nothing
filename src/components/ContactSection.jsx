import React, { useState } from 'react';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '');

function ContactSection({ id }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    setLoadProgress(0);

    // 13. Loading Bar Completion Text
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }
      
      setTimeout(() => {
        setStatus({ type: 'success', message: 'Loading complete. Nothing was affected.' });
        setForm({ name: '', email: '', message: '' });
        setSubmitting(false);
      }, 2500);

    } catch (err) {
      clearInterval(interval);
      setSubmitting(false);
      setStatus({
        type: 'error',
        message: err.message || 'Unable to send message. Please try again later.'
      });
    }
  };

  return (
    <section id={id} className="section section--contact">
      <header className="section-header">
        <h2 className="section-header__title">Transmit Into the Void</h2>
        <p className="section-header__subtitle">
          Send a message into carefully monitored emptiness. Responses are not expected and not
          required.
        </p>
      </header>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {submitting && (
            <div className="fake-loader" style={{ marginBottom: '1rem' }}>
              <div className="fake-loader__bar" style={{ width: `${loadProgress}%` }} />
              <span className="fake-loader__text">Compressing emptiness: {loadProgress}%</span>
            </div>
          )}
          <label className="field">
            <span className="field__label">Designation</span>
            <input
              className="field__input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span className="field__label">Signal origin (email)</span>
            <input
              className="field__input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span className="field__label">Transmission content</span>
            <textarea
              className="field__input field__input--multiline"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          {/* 25. The Empty Link */}
          <a href="#" className="faint-secret" onClick={(e) => { e.preventDefault(); window.location.reload(); }} style={{ display: 'block', marginBottom: '0.5rem', textDecoration: 'none' }}>
            Looking for a shortcut? Try here.
          </a>
          <button className="contact-form__submit" type="submit" disabled={submitting}>
            {submitting ? 'Transmitting…' : 'Send to the void'}
          </button>
          {status.message && (
            <p
              className={`contact-form__status contact-form__status--${status.type}`}
              role="status"
            >
              {status.message}
            </p>
          )}
        </form>

        <aside className="contact-aside">
          <h3 className="contact-aside__title">What the void accepts</h3>
          <ul className="contact-aside__list">
            <li>Existential questions with no clear answer</li>
            <li>Overly serious proposals for doing absolutely nothing</li>
            <li>Reports of anomalies that turned out to be normal</li>
            <li>Silence, represented as an empty message</li>
          </ul>
          {/* 21. The Unanswered Question */}
          <div className="unanswered-question" title="Wait for it...">
            <span className="question-mark">?</span>
            <div className="unanswered-answer">
              You waited for an answer. The waiting was the answer.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ContactSection;


