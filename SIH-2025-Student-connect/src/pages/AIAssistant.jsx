import React, { useState } from 'react';

const canned = [
  { q: /resume|cv|portfolio/i, a: 'Tip: Highlight measurable impact in your projects. Use STAR format: Situation, Task, Action, Result.' },
  { q: /internship|career|job/i, a: 'Recommended: Apply to SWE Intern at ExampleCorp and Data Intern at DataWiz. Tailor your resume keywords.' },
  { q: /ds[a| ]?algo|dsa|algorithm/i, a: 'Study plan: Arrays → Hashing → Two Pointers → Sliding Window → Trees → Graphs → DP.' },
];

export default function AIAssistant() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);

  function ask() {
    if (!input.trim()) return;
    const match = canned.find(c => c.q.test(input));
    const answer = match ? match.a : 'This is a demo response. In production, this will query an AI service over your uploaded content.';
    setHistory(h => [...h, { role: 'user', text: input }, { role: 'ai', text: answer }]);
    setInput('');
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>AI-powered Study & Career Assistant</h1>
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700 }}>Your Library</div>
            <div className="muted" style={{ fontSize: 12 }}>Upload e-books, notes, PDFs for smart search (demo only)</div>
          </div>
          <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files || []))} />
        </div>
        {files.length > 0 && <ul style={{ marginTop: 10 }}>
          {files.map((f, i) => <li key={i} className="muted">{f.name}</li>)}
        </ul>}
      </div>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Ask AI Mentor</div>
        <div className="row">
          <input
            className="input"
            placeholder="Ask about courses, careers, or study topics..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? ask() : null}
          />
          <button className="btn" onClick={ask}>Ask</button>
        </div>
        <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          {history.map((m, i) => (
            <div
              key={i}
              className="card"
              style={{ background: m.role === 'ai' ? 'var(--surface-2)' : 'transparent' }}
            >
              <div className="muted" style={{ fontSize: 12 }}>{m.role === 'ai' ? 'AI' : 'You'}</div>
              <div>{m.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}