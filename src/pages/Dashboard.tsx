import { Link } from 'react-router-dom';
import type { Board, Workspace } from '../models/workspace';

interface DashboardProps {
  workspace: Workspace;
  boards: Board[];
}

export default function Dashboard({ workspace, boards }: DashboardProps) {
  const recentBoards = [...boards]
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, 3);

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">A LITTLE CLARITY FOR YOUR DAY</p>
        <h1>Welcome to {workspace.name}</h1>
        <p>{workspace.description}</p>
      </div>
      <section className="panel welcome-panel">
        <div>
          <span className="section-kicker">BETTER, TOGETHER</span>
          <h2>Your next great idea has a home.</h2>
          <p>Pick up where your team left off. Make a little progress today.</p>
          <Link className="primary-link" to="/boards">Explore your boards <span aria-hidden="true">&rarr;</span></Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <span className="art-circle" />
          <span className="art-card art-card-back" />
          <span className="art-card art-card-front"><i /><i /><i /></span>
        </div>
      </section>
      <div className="stats-grid">
        <Link to="/boards" className="panel stat-card">
          <span className="stat-label">Workspace boards</span>
          <strong>{boards.length}</strong>
          <span className="stat-caption">Spaces to keep work moving <span aria-hidden="true">&rarr;</span></span>
        </Link>
        <Link to="/members" className="panel stat-card">
          <span className="stat-label">Workspace members</span>
          <strong>{workspace.memberCount}</strong>
          <span className="stat-caption">People making it happen <span aria-hidden="true">&rarr;</span></span>
        </Link>
      </div>
      <section aria-labelledby="recent-boards-title">
        <div className="section-heading">
          <div><h2 id="recent-boards-title">Recent boards</h2><p>Jump back into the work.</p></div>
          <Link className="text-link" to="/boards">View all boards <span aria-hidden="true">&rarr;</span></Link>
        </div>
        <div className="panel recent-list">
          {recentBoards.map((board) => (
            <Link to={`/boards#${board.id}`} className="recent-row" key={board.id}>
              <span className={`board-icon ${board.color}`} aria-hidden="true">&#9638;</span>
              <div className="recent-board-info"><h3>{board.name}</h3><p>{board.category}</p></div>
              <span className="board-date">Updated {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(board.updatedAt))}</span>
              <span className="row-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
