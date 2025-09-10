import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import '../styles/sidebar.css';

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebarCollapsed') === '1');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Persist collapsed state and set body class for width var
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0');
    document.body.classList.toggle('sidebar-collapsed', collapsed);
  }, [collapsed]);

  // Listen for navbar hamburger
  useEffect(() => {
    const handler = () => setMobileOpen(prev => !prev);
    window.addEventListener('sidebar:toggle', handler);
    return () => window.removeEventListener('sidebar:toggle', handler);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';
  const roleChip = user?.role === 'student' ? 'Student' : user?.role === 'faculty' ? 'Faculty' : user?.role ? 'Admin' : 'Visitor';

  const links = useMemo(() => {
    const studentLinks = [
      { to: '/student', label: 'Dashboard', icon: '📊' },
      { to: '/profile', label: 'Profile & Portfolio', icon: '🧑‍🎓' },
      { to: '/attendance', label: 'Attendance', icon: '🕒' },
      { to: '/complaints', label: 'Complaints', icon: '🧰' },
      { to: '/feed', label: 'Social Feed & Events', icon: '🗞️' }, // long label to prove no wrap/jump
      { to: '/ai', label: 'AI Assistant', icon: '🤖' },
      { to: '/gamification', label: 'Gamification', icon: '🏆' },
    ];
    const facultyLinks = [
      { to: '/admin', label: 'Dashboard', icon: '📊' },
      { to: '/feed', label: 'Social Feed', icon: '🗞️' },
      { to: '/ai', label: 'AI Assistant', icon: '🤖' },
    ];
    return user?.role === 'student' ? studentLinks : facultyLinks;
  }, [user?.role]);

  // Navigate and close drawer on mobile without blocking the default link
  function onNav(to) {
    navigate(to);
    setMobileOpen(false);
  }

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {mobileOpen && <div className="sb-backdrop" onClick={() => setMobileOpen(false)} />}

      <div className={'sidebar-modern' + (mobileOpen ? ' open' : '')}>
        <div className="sb-header">
          <div className="sb-brand">
            <div className="sb-logo" />
            <div>Smart Student Hub</div>
            <span className="chip info">Gen‑Z</span>
            <div className="sb-tools">
              <button
                className="btn ghost"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => setCollapsed(c => !c)}
              >
                {collapsed ? '›' : '‹'}
              </button>
            </div>
          </div>

          <div className="sb-greet">
            <div className="who">
              <span>Hey, {firstName} 👋</span>
            </div>
            <span className="chip">{roleChip}</span>
          </div>
        </div>

        <nav className="sb-nav">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) => 'sb-link' + (isActive ? ' active' : '')}
              onClick={() => onNav(l.to)}   // no preventDefault => keep normal click behavior
              title={l.label}
            >
              <div className="sb-icon">{l.icon}</div>
              <span className="sb-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sb-actions">
          <button className="btn" onClick={() => onNav(user?.role === 'student' ? '/student' : '/admin')}>My Dashboard</button>
          <button className="btn ghost" onClick={() => onNav('/feed')}>Create Post</button>
          <button className="btn ghost" onClick={() => onNav('/complaints')}>Report Issue</button>

          <div className="sb-footer">
            <span>v0.1 demo</span>
            <span>❤️ Campus</span>
          </div>
        </div>
      </div>
    </>
  );
}