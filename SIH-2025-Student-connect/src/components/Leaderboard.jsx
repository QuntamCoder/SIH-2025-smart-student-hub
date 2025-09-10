import React from 'react';

export default function Leaderboard({ title = 'Leaderboard', items = [] }) {
  return (
    <div className="card">
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <table className="table">
        <thead>
          <tr><th>#</th><th>Name</th><th>Points</th></tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={it.id || it.name}>
              <td>{idx + 1}</td>
              <td>{it.name}</td>
              <td>{it.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}