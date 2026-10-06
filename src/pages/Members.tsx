import Avatar from '../components/Avatar';
import type { Member } from '../models/workspace';

export default function Members({ members, workspaceName }: { members: Member[]; workspaceName: string }) {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">GREAT WORK IS A TEAM EFFORT</p>
        <h1>Members</h1>
        <p>The people bringing your workspace to life.</p>
      </div>
      <section className="panel members-panel" aria-labelledby="members-title">
        <div className="members-heading">
          <h2 id="members-title">Workspace members <span className="count-badge">{members.length}</span></h2>
          <p>Everyone collaborating in {workspaceName}.</p>
        </div>
        <div className="table-scroll">
          <table>
            <caption className="sr-only">{workspaceName} workspace members</caption>
            <thead><tr><th scope="col">Name</th><th scope="col">Email address</th><th scope="col">Role</th><th scope="col">Status</th></tr></thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <th scope="row"><div className="member-identity"><Avatar member={member} /><span>{member.name}</span></div></th>
                  <td><a className="email-link" href={`mailto:${member.email}`}>{member.email}</a></td>
                  <td><span className={member.role === 'Guest' ? 'guest-badge' : 'role-label'}>{member.role}</span></td>
                  <td><span className="status-label"><span className="status-dot" aria-hidden="true" />{member.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {members.length === 0 && <div className="empty-state"><p>No workspace members yet.</p></div>}
      </section>
      <p className="page-footnote">A shared workspace for your team and the people you collaborate with.</p>
    </>
  );
}
