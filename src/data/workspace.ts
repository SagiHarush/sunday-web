import type { Board, Workspace } from '../models/workspace';

export const workspace: Workspace = {
  id: 'acme',
  name: 'Acme',
  description: 'A shared space for big ideas and the everyday work that gets us there.',
  memberCount: 7,
};

export const boards: Board[] = [
  {
    id: 'product-roadmap',
    workspaceId: 'acme',
    name: 'Product Roadmap',
    description: 'Priorities, plans, and the next chapter of our product.',
    category: 'Product',
    color: 'sage',
    updatedAt: '2026-10-06T09:15:00Z',
  },
  {
    id: 'customer-launches',
    workspaceId: 'acme',
    name: 'Customer Launches',
    description: 'Helping every new customer get off to a great start.',
    category: 'Customer success',
    color: 'peach',
    updatedAt: '2026-10-05T14:30:00Z',
  },
  {
    id: 'website-redesign',
    workspaceId: 'acme',
    name: 'Website Redesign',
    description: 'A fresh home for our story, from first sketch to launch.',
    category: 'Design',
    color: 'lavender',
    updatedAt: '2026-10-04T11:00:00Z',
  },
];
