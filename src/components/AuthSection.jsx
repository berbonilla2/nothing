import React, { useState } from 'react';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '');

function AuthSection({ id, onAuth, isAuthed, onError }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_BASE}/api/auth/${mode === 'login' ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        if (onError) onError();
        throw new Error(data.error || 'Something went wrong.');
      }

      if (mode === 'register') {
        setStatus({
          type: 'success',
          message: 'Astronaut designation registered. You may now request clearance.'
        });
        setMode('login');
      } else {
        setStatus({
          type: 'success',
          message: `Clearance granted. Welcome back, ${data.user.email}.`
        });
        if (onAuth && data.user) {
          onAuth(data.user);
        }
      }
      setForm({ email: '', password: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Unable to complete the request. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // 5. Click Counter
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount > 5) {
      setStatus({ type: 'info', message: 'You have clicked this more times than necessary. It remains unchanged.' });
    }
  };

  return (
    <section id={id} className="section section--auth">
      <header className="section-header">
        <h2 className="section-header__title" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>Authorized Astronauts Only</h2>
        <p className="section-header__subtitle">
          Request clearance to access restricted nothing. Contents are classified, important, and
          entirely empty.
        </p>
      </header>

      <div className="auth-layout">
        <div>
          <div className="auth-toggle" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={`auth-toggle__button ${
                mode === 'login' ? 'auth-toggle__button--active' : ''
              }`}
              onClick={() => setMode('login')}
              role="tab"
              aria-selected={mode === 'login'}
            >
              Log in
            </button>
            <button
              type="button"
              className={`auth-toggle__button ${
                mode === 'register' ? 'auth-toggle__button--active' : ''
              }`}
              onClick={() => setMode('register')}
              role="tab"
              aria-selected={mode === 'register'}
            >
              Sign up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span className="field__label">Email</span>
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
              <span className="field__label">Password</span>
              <input
                className="field__input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </label>
            {/* 12. Button Tooltip */}
            <div className="auth-submit-wrap" title={isAuthed ? 'This button is resting.' : ''}>
              <button className="auth-form__submit" type="submit" disabled={submitting || isAuthed}>
                {submitting
                  ? 'Processing…'
                  : mode === 'login'
                    ? 'Request clearance'
                    : 'Register designation'}
              </button>
            </div>
            {status.message && (
              <p className={`auth-form__status auth-form__status--${status.type}`} role="status">
                {status.message}
              </p>
            )}
          </form>
        </div>

        <aside className="auth-aside">
          <h3 className="auth-aside__title">How this auth works</h3>
          <p className="auth-aside__body">
            Accounts are stored in MongoDB Atlas with hashed passwords using bcrypt. This is
            intentionally minimal—intended as a teaching demo rather than a full production auth
            system.
          </p>
          {/* 30. Hidden Apology */}
          {/* Sorry. There was nothing behind this either. */}
          <p className="auth-aside__body">
            For real-world systems, you&apos;d typically add session management, JWTs or cookies,
            email verification, and stronger password requirements.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default AuthSection;


