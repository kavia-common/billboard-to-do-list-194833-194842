import React from "react";

// PUBLIC_INTERFACE
export default function Header() {
  /** Renders the app header. */
  return (
    <header className="bb-header" role="banner">
      <div className="bb-header__inner">
        <div className="bb-brand" aria-label="Billboard">
          <div className="bb-brand__mark" aria-hidden="true" />
          <div className="bb-brand__text">
            <h1 className="bb-title">Billboard</h1>
            <p className="bb-subtitle">A minimal todo list that stays on this device.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
