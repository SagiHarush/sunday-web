import { expect, it, vi } from 'vitest';
import { createApi } from './api';
import { workspace, boards } from '../data/workspace';
import { members } from '../data/members';

it('uses the four remote endpoints, validates responses, and never masks failures with local data', async () => {
  const fetchMock = vi.fn<typeof fetch>();
  vi.stubGlobal('fetch', fetchMock);
  const client = createApi('https://api.example.com/');
  const signal = new AbortController().signal;
  const cases = [
    { request: () => client.getWorkspace('acme', signal), path: '/workspaces/acme', data: workspace },
    { request: () => client.getWorkspaceMembers('acme', signal), path: '/workspaces/acme/members', data: members },
    { request: () => client.getWorkspaceBoards('acme', signal), path: '/workspaces/acme/boards', data: boards },
    { request: () => client.getBoardMembers('website-redesign', signal), path: '/boards/website-redesign/members', data: members.filter((member) => member.id === 'alex') },
  ];
  for (const entry of cases) {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(entry.data), { status: 200 }));
    await expect(entry.request()).resolves.toEqual(entry.data);
    expect(fetchMock).toHaveBeenLastCalledWith(`https://api.example.com${entry.path}`, {
      headers: { Accept: 'application/json' }, signal,
    });
  }
  fetchMock.mockResolvedValueOnce(new Response(null, { status: 503 }));
  await expect(client.getWorkspace('acme')).rejects.toThrow('Sunday API request failed (503).');
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ ...workspace, memberCount: -1 })));
  await expect(client.getWorkspace('acme')).rejects.toThrow('unexpected response');
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify([{ ...boards[0], updatedAt: 'invalid' }])));
  await expect(client.getWorkspaceBoards('acme')).rejects.toThrow('unexpected response');
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify([{ ...members[0], role: 'unknown' }])));
  await expect(client.getWorkspaceMembers('acme')).rejects.toThrow('unexpected response');
  fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
  await expect(client.getBoardMembers('website-redesign')).rejects.toThrow('Failed to fetch');
  const local = createApi();
  const first = await local.getWorkspace('acme');
  first.name = 'Changed';
  await expect(local.getWorkspace('acme')).resolves.toEqual(workspace);
  await expect(local.getWorkspace('missing')).rejects.toThrow('not found');
  await expect(local.getBoardMembers('missing')).rejects.toThrow('not found');
});
