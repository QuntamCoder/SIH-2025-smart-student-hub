import { useState } from 'react';

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [text, setText] = useState('');

  return (
    <div className="card" style={{ display: 'grid', gap: 8 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row">
          <div style={{ width: 32, height: 32, borderRadius: 999, background: '#334155', display: 'grid', placeItems: 'center' }}>{post.author[0]}</div>
          <div>
            <div style={{ fontWeight: 600 }}>{post.author}</div>
            <div className="muted" style={{ fontSize: 12 }}>{post.timestamp}</div>
          </div>
        </div>
        <span className="chip">{post.category}</span>
      </div>
      <div>{post.content}</div>
      {post.media && <div className="card" style={{ background: '#0b1220' }}>
        <div className="muted">[Media: {post.media.type}]</div>
      </div>}
      <div className="row">
        <button className="btn ghost" onClick={() => setLikes(l => l + 1)}>👍 Like ({likes})</button>
      </div>
      <div>
        <div className="muted" style={{ marginBottom: 6 }}>Comments</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {comments.map((c, i) => (
            <div key={i} className="card" style={{ background: '#0b1220' }}>
              <div style={{ fontWeight: 600 }}>{c.author}</div>
              <div className="muted" style={{ fontSize: 12 }}>{c.timestamp}</div>
              <div>{c.text}</div>
            </div>
          ))}
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <input className="input" placeholder="Write a comment..." value={text} onChange={e => setText(e.target.value)} />
          <button className="btn" onClick={() => { if (text.trim()) { setComments(cs => [...cs, { author: 'You', text, timestamp: new Date().toLocaleString() }]); setText(''); } }}>Comment</button>
        </div>
      </div>
    </div>
  );
}