import { boards, workspace } from '../data/workspace';
import { boardMemberIds, members } from '../data/members';
import type { Board, Member, Workspace } from '../models/workspace';

export interface SundayApi {
  getWorkspace(id: string, signal?: AbortSignal): Promise<Workspace>;
  getWorkspaceMembers(id: string, signal?: AbortSignal): Promise<Member[]>;
  getWorkspaceBoards(id: string, signal?: AbortSignal): Promise<Board[]>;
  getBoardMembers(id: string, signal?: AbortSignal): Promise<Member[]>;
}

type Guard<T> = (value: unknown) => value is T;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

const isWorkspace: Guard<Workspace> = (value): value is Workspace =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.name === 'string' &&
  typeof value.description === 'string' &&
  typeof value.memberCount === 'number' &&
  Number.isInteger(value.memberCount) && value.memberCount >= 0;

const isBoard: Guard<Board> = (value): value is Board =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.workspaceId === 'string' &&
  typeof value.name === 'string' &&
  typeof value.description === 'string' &&
  typeof value.category === 'string' &&
  (value.color === 'sage' || value.color === 'peach' || value.color === 'lavender') &&
  typeof value.updatedAt === 'string' && Number.isFinite(Date.parse(value.updatedAt));

const isMember: Guard<Member> = (value): value is Member =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.name === 'string' &&
  typeof value.email === 'string' &&
  (value.role === 'Admin' || value.role === 'Member' || value.role === 'Guest') &&
  value.status === 'Active' &&
  (value.avatarColor === 'sage' || value.avatarColor === 'peach' ||
    value.avatarColor === 'lavender' || value.avatarColor === 'blue');

function listOf<T>(guard: Guard<T>): Guard<T[]> {
  return (value): value is T[] => Array.isArray(value) && value.every(guard);
}

function requireWorkspace(id: string) {
  if (id !== workspace.id) throw new Error(`Workspace "${id}" was not found.`);
}

const localApi: SundayApi = {
  async getWorkspace(id) {
    requireWorkspace(id);
    return structuredClone(workspace);
  },
  async getWorkspaceMembers(id) {
    requireWorkspace(id);
    return structuredClone(members);
  },
  async getWorkspaceBoards(id) {
    requireWorkspace(id);
    return structuredClone(boards);
  },
  async getBoardMembers(id) {
    const ids = boardMemberIds[id];
    if (!boards.some((board) => board.id === id) || !ids) {
      throw new Error(`Board "${id}" was not found.`);
    }
    return structuredClone(members.filter((member) => ids.includes(member.id)));
  },
};

export function createApi(baseUrl?: string): SundayApi {
  const url = baseUrl?.trim().replace(/\/+$/, '');
  if (!url) return localApi;

  async function get<T>(path: string, guard: Guard<T>, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${url}${path}`, {
      headers: { Accept: 'application/json' },
      signal,
    });
    if (!response.ok) {
      throw new Error(`Sunday API request failed (${response.status}).`);
    }
    const data: unknown = await response.json();
    if (!guard(data)) throw new Error('Sunday API returned an unexpected response.');
    return data;
  }

  return {
    getWorkspace: (id, signal) => get(`/workspaces/${encodeURIComponent(id)}`, isWorkspace, signal),
    getWorkspaceMembers: (id, signal) => get(`/workspaces/${encodeURIComponent(id)}/members`, listOf(isMember), signal),
    getWorkspaceBoards: (id, signal) => get(`/workspaces/${encodeURIComponent(id)}/boards`, listOf(isBoard), signal),
    getBoardMembers: (id, signal) => get(`/boards/${encodeURIComponent(id)}/members`, listOf(isMember), signal),
  };
}

export const api = createApi(import.meta.env.VITE_API_URL);
