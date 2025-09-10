import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const initials = user?.name
    ? user.name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()
    : 'G';

  return (
    <>
      <div className="row" style={{ gap: 10 }}>
        <div style={{ fontWeight: 700 }}>Smart Student Hub</div>
        <span className="chip">v0.1 demo</span>
      </div>
      <div className="search">
        <span role="img" aria-label="search">🔎</span>
        <input placeholder="Search students, posts, complaints, courses..." />
        <span className="kbd">Ctrl</span> + <span className="kbd">K</span>
      </div>
      <div className="row">
        {user ? (
          <>
            <span className="chip">
              {user.role === 'student' ? 'Student' : user.role === 'faculty' ? 'Faculty' : 'Admin'}
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 999, background: '#2563eb', color: 'white', display: 'grid', placeItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{initials}</span>
            </div>
            <button className="btn ghost" onClick={() => navigate(user.role === 'student' ? '/student' : '/admin')}>My Dashboard</button>
            <button className="btn danger" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost">Login</Link>
            <Link to="/signup" className="btn">Sign up</Link>
          </>
        )}
      </div>
    </>
  );
}