export interface Workspace {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export interface Board {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  category: string;
  color: 'sage' | 'peach' | 'lavender';
  updatedAt: string;
}
