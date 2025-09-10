import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Sidebar() {
  const { user } = useAuth();

  const studentLinks = [
    { to: '/student', label: 'Dashboard', icon: '📊' },
    { to: '/profile', label: 'Profile & Portfolio', icon: '🧑‍🎓' },
    { to: '/attendance', label: 'Attendance', icon: '🕒' },
    { to: '/complaints', label: 'Complaints', icon: '🧰' },
    { to: '/feed', label: 'Social Feed', icon: '🗞️' },
    { to: '/ai', label: 'AI Assistant', icon: '🤖' },
    { to: '/gamification', label: 'Gamification', icon: '🏆' },
  ];

  const facultyLinks = [
    { to: '/admin', label: 'Dashboard', icon: '📊' },
    { to: '/feed', label: 'Social Feed', icon: '🗞️' },
    { to: '/ai', label: 'AI Assistant', icon: '🤖' },
  ];

  const links = user?.role === 'student' ? studentLinks : facultyLinks;

  return (
    <div style={{ padding: 12 }}>
      <div style={{ padding: 12, marginBottom: 12, fontWeight: 700 }}>SSH</div>
      <nav style={{ display: 'grid', gap: 6 }}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <span>{l.icon}</span>
            <span className="label">{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}