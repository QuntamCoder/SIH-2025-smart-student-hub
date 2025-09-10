import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // If already logged in, redirect based on role
  useEffect(() => {
    if (user) {
      navigate(user.role === 'student' ? '/' : '/admin', { replace: true });
    }
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const u = await login(form.email, form.password);
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else {
        navigate(u.role === 'student' ? '/' : '/admin', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ width: 380, maxWidth: '100%' }}>
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Sign in</div>
        <div className="muted" style={{ marginBottom: 12 }}>Use demo accounts or your signed-up credentials.</div>
        {error && <div className="chip danger" style={{ marginBottom: 10 }}>{error}</div>}
        <form className="grid" style={{ gap: 10 }} onSubmit={onSubmit}>
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button className="btn" type="submit">Login</button>
        </form>

        <div style={{ marginTop: 12 }}>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>Demo credentials</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12 }}>
            <li>Student: john@student.edu / 123456</li>
            <li>Faculty: jane@college.edu / 123456</li>
            <li>Admin: admin@college.edu / 123456</li>
          </ul>
        </div>

        <div style={{ marginTop: 12, fontSize: 14 }}>
          New here? <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
}