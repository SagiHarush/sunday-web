import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { boards, workspace } from './data/workspace';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard workspace={workspace} boards={boards} />} />
        <Route path="/boards" element={<div className="page-heading"><h1>Boards</h1><p>Your team's shared workspaces.</p></div>} />
        <Route path="/members" element={<div className="page-heading"><h1>Members</h1><p>The people in your workspace.</p></div>} />
        <Route path="*" element={<div className="page-heading"><h1>Page not found</h1><p>Choose a page from the workspace navigation.</p></div>} />
      </Routes>
    </Layout>
  );
}
