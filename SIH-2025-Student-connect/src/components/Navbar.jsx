// Optional: safe even with the automatic JSX runtime
import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className="row" style={{ gap: 10 }}>
        <div style={{ fontWeight: 700 }}>Smart Student Hub</div>
        <span className="chip">v0.1 demo</span>
      </div>
      <div className="search">
        <span role="img" aria-label="search">🔎</span>
        <input placeholder="Search students, posts, complaints, courses..." />
        <span className="kbd">Ctrl</span> + <span className="kbd">K</span>
      </div>
      <div className="row">
        <span className="chip">Student</span>
        <div style={{ width: 34, height: 34, borderRadius: 999, background: '#3b82f6', display: 'grid', placeItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>SJ</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;