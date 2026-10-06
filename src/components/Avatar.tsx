import type { Member } from '../models/workspace';

export default function Avatar({ member }: { member: Member }) {
  const initials = member.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('');
  return <span className={`avatar ${member.avatarColor}`} aria-hidden="true">{initials}</span>;
}
