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

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Guest';
  status: 'Active';
  avatarColor: 'sage' | 'peach' | 'lavender' | 'blue';
}
