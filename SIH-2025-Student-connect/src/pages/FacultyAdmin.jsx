import { useState } from 'react';
import { approvals, analytics } from '../data/faculty.js';
import { downloadCSV } from '../utils/download.js';

export default function FacultyAdmin() {
  const [queue, setQueue] = useState(approvals);

  function setStatus(id, status) {
    setQueue(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  }

  function exportReport() {
    const rows = [
      ['Metric', 'Value'],
      ['Active Students', analytics.activeStudents],
      ['Avg Attendance (%)', analytics.avgAttendance],
      ['Events This Month', analytics.events],
      ['Complaints Open', analytics.complaintsOpen],
    ];
    downloadCSV('naac_report.csv', rows);
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>Faculty & Admin Panel</h1>
      <div className="grid cols-3">
        <AdminStat title="Active Students" value={analytics.activeStudents} />
        <AdminStat title="Avg Attendance" value={`${analytics.avgAttendance}%`} />
        <AdminStat title="Events This Month" value={analytics.events} />
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="muted">NAAC/NIRF/AICTE-ready summary</div>
        <button className="btn" onClick={exportReport}>Export Report (CSV)</button>
      </div>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Approval Workflow</div>
        <table className="table">
          <thead><tr><th>Type</th><th>Student</th><th>Details</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {queue.map(item => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.student}</td>
                <td>{item.details}</td>
                <td><span className={`chip ${item.status === 'Approved' ? 'success' : item.status === 'Rejected' ? 'danger' : 'warning'}`}>{item.status}</span></td>
                <td className="row">
                  <button className="btn success" onClick={() => setStatus(item.id, 'Approved')}>Approve</button>
                  <button className="btn danger" onClick={() => setStatus(item.id, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminStat({ title, value }) {
  return (
    <div className="card">
      <div className="muted" style={{ fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}