import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Sunday home">
          <span className="brand-mark" aria-hidden="true">s</span>
          Sunday<span className="brand-dot">.</span>
        </a>
        <div className="workspace-label">
          <span className="workspace-icon" aria-hidden="true">A</span>
          <div><strong>Acme</strong><span>Workspace</span></div>
        </div>
        <div className="sidebar-footer">A little clarity. A lot of progress.</div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>Sunday <span className="header-divider">/</span> <strong>Acme workspace</strong></span>
          <span className="profile-avatar" aria-label="Signed in as Jordan Lee">JL</span>
        </header>
        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}
