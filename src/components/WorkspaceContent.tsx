import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { Board, Member, Workspace } from '../models/workspace';
import { api } from '../services/api';
import Dashboard from '../pages/Dashboard';
import Boards from '../pages/Boards';
import Members from '../pages/Members';
import Layout from './Layout';

interface WorkspaceData {
  workspace: Workspace;
  boards: Board[];
  members: Member[];
  boardMembers: Record<string, Member[]>;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: WorkspaceData };

export default function WorkspaceContent() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setState({ status: 'loading' });

    async function loadWorkspace() {
      try {
        const [workspace, boards, members] = await Promise.all([
          api.getWorkspace('acme', signal),
          api.getWorkspaceBoards('acme', signal),
          api.getWorkspaceMembers('acme', signal),
        ]);
        const entries = await Promise.all(
          boards.map(async (board) => [board.id, await api.getBoardMembers(board.id, signal)] as const),
        );
        if (!signal.aborted) {
          setState({ status: 'ready', data: { workspace, boards, members, boardMembers: Object.fromEntries(entries) } });
        }
      } catch (error) {
        if (!signal.aborted) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred while loading your workspace.',
          });
        }
      }
    }

    void loadWorkspace();
    return () => controller.abort();
  }, [attempt]);

  return (
    <Layout workspaceName={state.status === 'ready' ? state.data.workspace.name : 'Acme'}>
      {state.status === 'loading' && <div className="panel empty-state" role="status">Loading your workspace...</div>}
      {state.status === 'error' && (
        <div className="panel empty-state" role="alert">
          <h1>We couldn't load your workspace</h1>
          <p>{state.message}</p>
          <button className="primary-link" onClick={() => setAttempt((value) => value + 1)}>Try again</button>
        </div>
      )}
      {state.status === 'ready' && (
        <Routes>
          <Route path="/" element={<Dashboard workspace={state.data.workspace} boards={state.data.boards} />} />
          <Route path="/boards" element={<Boards workspaceName={state.data.workspace.name} boards={state.data.boards} boardMembers={state.data.boardMembers} />} />
          <Route path="/members" element={<Members workspaceName={state.data.workspace.name} members={state.data.members} />} />
          <Route path="*" element={<div className="page-heading"><h1>Page not found</h1><p>Choose a page from the workspace navigation.</p></div>} />
        </Routes>
      )}
    </Layout>
  );
}
