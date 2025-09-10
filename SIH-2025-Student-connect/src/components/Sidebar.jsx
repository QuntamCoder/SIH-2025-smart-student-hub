import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/profile', label: 'Profile & Portfolio', icon: '🧑‍🎓' },
  { to: '/attendance', label: 'Attendance', icon: '🕒' },
  { to: '/complaints', label: 'Complaints', icon: '🧰' },
  { to: '/feed', label: 'Social Feed', icon: '🗞️' },
  { to: '/ai', label: 'AI Assistant', icon: '🤖' },
  { to: '/admin', label: 'Faculty/Admin', icon: '🛠️' },
  { to: '/gamification', label: 'Gamification', icon: '🏆' },
];

export default function Sidebar() {
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