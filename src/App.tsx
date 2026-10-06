import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <div className="page-heading">
        <p className="eyebrow">YOUR WORK, TOGETHER</p>
        <h1>Welcome to Sunday</h1>
        <p>A calmer place to move your team's work forward.</p>
      </div>
      <section className="panel welcome-panel">
        <span className="section-kicker">ACME WORKSPACE</span>
        <h2>Good work starts with a shared space.</h2>
        <p>Your boards and people, all in one place.</p>
      </section>
    </Layout>
  );
}
