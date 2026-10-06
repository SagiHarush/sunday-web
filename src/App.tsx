import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { boards, workspace } from './data/workspace';
import { boardMemberIds, members } from './data/members';
import Boards from './pages/Boards';
import Members from './pages/Members';

const boardMembers = Object.fromEntries(
  boards.map((board) => [board.id, members.filter((member) => boardMemberIds[board.id].includes(member.id))]),
);

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard workspace={workspace} boards={boards} />} />
        <Route path="/boards" element={<Boards boards={boards} boardMembers={boardMembers} />} />
        <Route path="/members" element={<Members members={members} />} />
        <Route path="*" element={<div className="page-heading"><h1>Page not found</h1><p>Choose a page from the workspace navigation.</p></div>} />
      </Routes>
    </Layout>
  );
}
