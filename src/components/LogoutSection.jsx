import React from 'react';

function LogoutSection({ id, onLogout }) {
  return (
    <section id={id} className="section section--logout">
      <header className="section-header">
        <h2 className="section-header__title">Disengage from the Void</h2>
        <p className="section-header__subtitle">
          Logging out will terminate your authorized observation of absolutely nothing.
        </p>
      </header>

      <div className="logout-panel">
        <p className="logout-panel__warning">
          Once you leave, you may lose access to:
          <br />
          · 0 secrets
          <br />
          · 0 responsibilities
          <br />
          · 0 meaningful updates
        </p>
        <button
          type="button"
          className="logout-panel__button"
          onClick={onLogout}
        >
          Log out anyway
        </button>
        <p className="logout-panel__note">
          Confirmation: upon logout, the universe will remain unchanged.
        </p>
      </div>
    </section>
  );
}

export default LogoutSection;


