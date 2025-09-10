import React from 'react';
import StatCard from '../components/StatCard.jsx';
import Leaderboard from '../components/Leaderboard.jsx';
import { attendanceSummary } from '../data/attendance.js';
import { posts } from '../data/feed.js';
import { badges } from '../data/badges.js';
import { leaderboard } from '../data/leaderboard.js';
import { complaints } from '../data/complaints.js';

export default function StudentDashboard() {
  const openComplaints = complaints.filter(c => c.status !== 'Resolved').length;

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="page-hero">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="muted" style={{ fontSize: 12 }}>Welcome back</div>
            <h1 style={{ margin: '4px 0 6px' }}>Your student hub</h1>
            <div className="muted">Track attendance, manage portfolio, and stay updated—all in one place.</div>
          </div>
          <div className="row">
            <button className="btn">Share Portfolio</button>
            <button className="btn ghost">View Feed</button>
          </div>
        </div>
      </div>

      <div className="grid cols-4">
        <StatCard title="Attendance (This Month)" value={`${attendanceSummary.monthPercent}%`} sub={`${attendanceSummary.present}/${attendanceSummary.total} days`} tone="primary" icon="📅" />
        <StatCard title="Badges Earned" value={badges.length} sub="Keep up the streak!" tone="success" icon="🎖️" />
        <StatCard title="Open Complaints" value={openComplaints} sub="Awaiting resolution" tone="warning" icon="🧰" />
        <StatCard title="Feed Updates" value={posts.length} sub="Latest announcements & posts" tone="info" icon="🗞️" />
      </div>

      <div className="grid cols-2">
        <div className="card">
          <h2>Recent Announcements</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {posts.slice(0, 5).map(p => (
              <li key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 600 }}>{p.title || p.content.slice(0, 80)}{p.content.length > 80 ? '…' : ''}</div>
                <div className="muted" style={{ fontSize: 12 }}>{p.category} • {p.timestamp}</div>
              </li>
            ))}
          </ul>
        </div>
        <Leaderboard title="Top Performers" items={leaderboard} />
      </div>
    </div>
  );
}