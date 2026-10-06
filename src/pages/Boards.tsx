import Avatar from '../components/Avatar';
import type { Board, Member } from '../models/workspace';

interface BoardsProps {
  boards: Board[];
  boardMembers: Record<string, Member[]>;
}

export default function Boards({ boards, boardMembers }: BoardsProps) {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">ROOM FOR EVERY GOOD IDEA</p>
        <h1>Boards</h1>
        <p>Your team's plans, projects, and progress. All in one place.</p>
      </div>
      <div className="section-heading">
        <h2>Workspace boards <span className="count-badge">{boards.length}</span></h2>
        <span className="muted-label">Acme workspace</span>
      </div>
      <div className="boards-grid">
        {boards.map((board) => (
          <article className={`panel board-card board-${board.color}`} id={board.id} key={board.id}>
            <div className="board-card-heading">
              <span className={`board-icon ${board.color}`} aria-hidden="true">&#9638;</span>
              <span className="category-label">{board.category}</span>
            </div>
            <h2>{board.name}</h2>
            <p className="board-description">{board.description}</p>
            <div className="board-team">
              <span className="team-label">BOARD MEMBERS</span>
              <ul className="board-member-list" aria-label={`${board.name} members`}>
                {(boardMembers[board.id] ?? []).map((member) => (
                  <li key={member.id}><Avatar member={member} /><span>{member.name}</span></li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      {boards.length === 0 && <div className="panel empty-state"><h2>No boards yet</h2><p>Your workspace boards will appear here.</p></div>}
    </>
  );
}
