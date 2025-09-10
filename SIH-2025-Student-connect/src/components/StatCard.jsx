import React from 'react';

export default function StatCard({ title, value, sub, tone = 'default', icon = null }) {
  const toneColor = {
    default: 'var(--text)',
    primary: 'var(--primary-700)',
    success: '#166534',
    warning: '#7c2d12',
    danger: '#b91c1c',
    info: '#1e40af',
  }[tone] || 'var(--text)';

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{
        height: 4,
        background: tone === 'success'
          ? 'linear-gradient(90deg, #22c55e, #86efac)'
          : tone === 'primary'
          ? 'linear-gradient(90deg, var(--primary), #22c55e)'
          : tone === 'warning'
          ? 'linear-gradient(90deg, #f59e0b, #fde68a)'
          : tone === 'danger'
          ? 'linear-gradient(90deg, #ef4444, #fecaca)'
          : 'linear-gradient(90deg, #93c5fd, #bfdbfe)'
      }} />
      <div className="row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
        <div>
          <div className="muted" style={{ fontSize: 12 }}>{title}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: toneColor, lineHeight: 1, marginTop: 6 }}>
            {value}
          </div>
          {sub && <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>{sub}</div>}
        </div>
        {icon && (
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, #ecfeff, #f0fdf4)',
            display: 'grid', placeItems: 'center', color: toneColor, fontSize: 20,
            border: '1px solid var(--border)'
          }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}