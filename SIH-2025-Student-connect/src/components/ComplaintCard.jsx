import React from 'react';

export default function ComplaintCard({ complaint }) {
  const tone =
    complaint.status === 'Resolved'
      ? 'success'
      : complaint.status === 'In Progress'
      ? 'warning'
      : 'danger';

  return (
    <div className="card" style={{ display: 'grid', gap: 6 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 600 }}>{complaint.title}</div>
        <span className={`chip ${tone}`}>{complaint.status}</span>
      </div>
      <div className="muted" style={{ fontSize: 12 }}>
        {complaint.timestamp} • {complaint.location}
      </div>
      <div>{complaint.description}</div>
      {complaint.media && (
        <div className="card" style={{ background: 'var(--surface-2)' }}>
          <div className="muted">[Attached {complaint.media.type}]</div>
        </div>
      )}
      <div className="muted" style={{ fontSize: 12 }}>Tracking ID: {complaint.id}</div>
    </div>
  );
}