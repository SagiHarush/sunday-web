import type { Member } from '../models/workspace';

export const members: Member[] = [
  { id: 'jordan', name: 'Jordan Lee', email: 'jordan@acme.com', role: 'Admin', status: 'Active', avatarColor: 'sage' },
  { id: 'sam', name: 'Sam Rivera', email: 'sam@acme.com', role: 'Member', status: 'Active', avatarColor: 'peach' },
  { id: 'priya', name: 'Priya Patel', email: 'priya@acme.com', role: 'Member', status: 'Active', avatarColor: 'lavender' },
  { id: 'oliver', name: 'Oliver Brooks', email: 'oliver@acme.com', role: 'Member', status: 'Active', avatarColor: 'blue' },
  { id: 'alex', name: 'Alex Morgan', email: 'freelancer@example.com', role: 'Guest', status: 'Active', avatarColor: 'peach' },
  { id: 'maya', name: 'Maya Chen', email: 'consultant@agency.com', role: 'Guest', status: 'Active', avatarColor: 'lavender' },
  { id: 'daniel', name: 'Daniel Ross', email: 'partner@vendor.com', role: 'Guest', status: 'Active', avatarColor: 'blue' },
];

export const boardMemberIds: Record<string, string[]> = {
  'product-roadmap': ['jordan', 'priya', 'maya'],
  'customer-launches': ['sam', 'oliver', 'daniel'],
  'website-redesign': ['jordan', 'priya', 'alex'],
};
