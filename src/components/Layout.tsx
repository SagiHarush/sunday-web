import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Layout({ children, workspaceName }: { children: ReactNode; workspaceName: string }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="Sunday home">
          <span className="brand-mark" aria-hidden="true">s</span>
          Sunday<span className="brand-dot">.</span>
        </Link>
        <div className="workspace-label">
          <span className="workspace-icon" aria-hidden="true">{workspaceName[0]}</span>
          <div><strong>{workspaceName}</strong><span>Workspace</span></div>
        </div>
        <nav aria-label="Main navigation">
          <span className="nav-label">WORKSPACE</span>
          <NavLink to="/" end><span aria-hidden="true">&#8962;</span>Home</NavLink>
          <NavLink to="/boards"><span aria-hidden="true">&#9638;</span>Boards</NavLink>
          <NavLink to="/members"><span aria-hidden="true">&#9825;</span>Members</NavLink>
        </nav>
        <div className="sidebar-footer">A little clarity. A lot of progress.</div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>Sunday <span className="header-divider">/</span> <strong>{workspaceName} workspace</strong></span>
          <span className="profile-avatar" aria-label="Signed in as Jordan Lee">JL</span>
        </header>
        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}
