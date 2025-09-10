export default function StatCard({ title, value, sub, tone = 'default' }) {
  const toneColor = {
    default: 'var(--text)',
    primary: '#93c5fd',
    success: '#86efac',
    warning: '#fde68a',
    danger: '#fca5a5',
  }[tone] || 'var(--text)';
  return (
    <div className="card">
      <div className="muted" style={{ fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: toneColor, marginTop: 6 }}>{value}</div>
      {sub && <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>{sub}</div>}
    </div>
  );
}