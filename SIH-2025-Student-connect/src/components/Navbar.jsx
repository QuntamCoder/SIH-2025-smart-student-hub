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

  function toggleSidebar() {
    window.dispatchEvent(new CustomEvent('sidebar:toggle'));
  }

  return (
    <>
      <button className="btn ghost nav-burger" onClick={toggleSidebar} aria-label="Toggle sidebar">☰</button>
      <div className="brand">
        <div className="brand-mark" />
        <div>Smart Student Hub</div>
        <span className="chip info hide-mobile">Demo</span>
      </div>
      <div className="search hide-mobile">
        <span role="img" aria-label="search">🔎</span>
        <input placeholder="Search students, posts, complaints, courses..." />
        <span className="kbd">⌘</span><span className="kbd">K</span>
      </div>
      <div className="row">
        {user ? (
          <>
            <span className="chip hide-mobile">
              {user.role === 'student' ? 'Student' : user.role === 'faculty' ? 'Faculty' : 'Admin'}
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--primary)', color: 'white', display: 'grid', placeItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{initials}</span>
            </div>
            <button className="btn ghost hide-mobile" onClick={() => navigate(user.role === 'student' ? '/student' : '/admin')}>My Dashboard</button>
            <button className="btn danger">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost hide-mobile">Login</Link>
            <Link to="/signup" className="btn hide-mobile">Sign up</Link>
          </>
        )}
      </div>
    </>
  );
}