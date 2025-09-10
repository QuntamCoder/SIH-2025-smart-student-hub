import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate(user.role === 'student' ? '/' : '/admin', { replace: true });
    }
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const u = await signup(form);
      navigate(u.role === 'student' ? '/' : '/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ width: 420, maxWidth: '100%' }}>
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Create account</div>
        {error && <div className="chip danger" style={{ marginBottom: 10 }}>{error}</div>}
        <form className="grid" style={{ gap: 10 }} onSubmit={onSubmit}>
          <input className="input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <select className="select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="faculty">Faculty/Admin</option>
          </select>
          <button className="btn" type="submit">Sign up</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}