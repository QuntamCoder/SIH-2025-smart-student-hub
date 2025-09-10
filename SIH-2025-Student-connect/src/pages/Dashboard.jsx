import React from 'react';
import StatCard from '../components/StatCard.jsx';
import Leaderboard from '../components/Leaderboard.jsx';
import { attendanceSummary } from '../data/attendance.js';
import { posts } from '../data/feed.js';
import { badges } from '../data/badges.js'
import { leaderboard } from '../data/leaderboard.js';
import { complaints } from '../data/complaints.js';

export default function Dashboard() {
  const openComplaints = complaints.filter(c => c.status !== 'Resolved').length;
  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>Dashboard</h1>
      <div className="grid cols-4">
        <StatCard title="Attendance (This Month)" value={`${attendanceSummary.monthPercent}%`} sub={`${attendanceSummary.present}/${attendanceSummary.total} days`} tone="primary" />
        <StatCard title="Badges Earned" value={badges.length} sub="Keep up the streak!" tone="success" />
        <StatCard title="Open Complaints" value={openComplaints} sub="Awaiting resolution" tone="warning" />
        <StatCard title="Feed Updates" value={posts.length} sub="Latest announcements & posts" />
      </div>
      <div className="grid cols-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Recent Announcements</div>
          <ul>
            {posts.slice(0, 5).map(p => (
              <li key={p.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{p.title || p.content.slice(0, 50)}{p.content.length > 50 ? '...' : ''}</div>
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