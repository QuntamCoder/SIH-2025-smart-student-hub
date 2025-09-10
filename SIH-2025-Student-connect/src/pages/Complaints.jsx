import { useState } from 'react';
import { complaints as seedComplaints } from '../data/complaints.js';
import ComplaintCard from '../components/ComplaintCard.jsx';

export default function Complaints() {
  const [items, setItems] = useState(seedComplaints);
  const [form, setForm] = useState({ title: '', description: '', location: '', media: null });

  function submit(e) {
    e.preventDefault();
    const newItem = {
      id: 'CMP-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      title: form.title || 'Untitled Complaint',
      description: form.description,
      location: form.location || 'Unknown',
      timestamp: new Date().toLocaleString(),
      status: 'Submitted',
      media: form.media ? { type: form.media.type, name: form.media.name } : null,
    };
    setItems([newItem, ...items]);
    setForm({ title: '', description: '', location: '', media: null });
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>Complaint & Grievance Redressal</h1>
      <div className="grid cols-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Report an Issue</div>
          <form className="grid" style={{ gap: 10 }} onSubmit={submit}>
            <input className="input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea className="textarea" placeholder="Describe the issue..." rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input className="input" placeholder="Location (auto geo-tag in production)" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <input className="file" type="file" accept="image/*,audio/*,video/*" onChange={e => setForm({ ...form, media: e.target.files?.[0] || null })} />
            <div className="row">
              <button type="submit" className="btn">Submit Complaint</button>
              <button type="button" className="btn ghost" onClick={() => alert('Geo-tag attached (simulated).')}>Attach Geo-tag</button>
            </div>
          </form>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Your Complaints</div>
          <div className="grid" style={{ gap: 10 }}>
            {items.map(c => <ComplaintCard key={c.id} complaint={c} />)}
          </div>
        </div>
      </div>
    </div>
  );
}