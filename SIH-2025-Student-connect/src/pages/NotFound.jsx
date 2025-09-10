import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card" style={{ maxWidth: 560, margin: '40px auto', textAlign: 'center' }}>
      <div style={{ fontSize: 48 }}>🔎</div>
      <h1>Page Not Found</h1>
      <div className="muted">The page you are looking for does not exist.</div>
      <div style={{ marginTop: 16 }}>
        <Link to="/" className="btn">Back to Dashboard</Link>
      </div>
    </div>
  );
}