import { useState } from 'react';
import { attendanceSummary, classes } from '../data/attendance.js';
import StatCard from '../components/StatCard.jsx';

export default function Attendance() {
  const [list, setList] = useState(classes);

  function markPresent(id) {
    setList(prev => prev.map(c => c.id === id ? { ...c, present: !c.present } : c));
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>Attendance Management</h1>
      <div className="grid cols-3">
        <StatCard title="This Month" value={`${attendanceSummary.monthPercent}%`} sub={`${attendanceSummary.present}/${attendanceSummary.total} days`} tone="primary" />
        <StatCard title="Today" value={`${attendanceSummary.todayPresent ? 'Present' : 'Absent'}`} sub={attendanceSummary.date} tone={attendanceSummary.todayPresent ? 'success' : 'danger'} />
        <StatCard title="Workshops/Labs" value={attendanceSummary.workshops} sub="Upcoming this week" />
      </div>
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontWeight: 700 }}>Classes</div>
          <div className="row">
            <button className="btn ghost" onClick={() => alert('Simulated QR scan. Attendance marked if enrolled.')}>Scan QR</button>
            <button className="btn ghost" onClick={() => alert('NFC not available in web demo. This is a stub.')}>Use NFC</button>
            <button className="btn" onClick={() => alert('Geo-tagged attendance simulated with your browser location (not captured).')}>Geo Tag</button>
          </div>
        </div>
        <table className="table">
          <thead><tr><th>Course</th><th>Time</th><th>Room</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id}>
                <td>{c.course}</td>
                <td>{c.time}</td>
                <td>{c.room}</td>
                <td>
                  <span className={`chip ${c.present ? 'success' : ''}`}>{c.present ? 'Present' : 'Not Marked'}</span>
                </td>
                <td><button className="btn" onClick={() => markPresent(c.id)}>{c.present ? 'Undo' : 'Mark Present'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}