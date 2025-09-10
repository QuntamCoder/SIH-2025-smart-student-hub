export default function Badge({ name, desc }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 22 }}>🎖️</span>
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        {desc && <div className="muted" style={{ fontSize: 12 }}>{desc}</div>}
      </div>
    </div>
  );
}