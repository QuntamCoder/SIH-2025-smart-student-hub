import { useState } from 'react';
import { posts as seedPosts } from '../data/feed.js';
import PostCard  from '../components/PostCard.jsx';
export default function SocialFeed() {
  const [posts, setPosts] = useState(seedPosts);
  const [form, setForm] = useState({ content: '', category: 'Announcement' });

  function addPost() {
    if (!form.content.trim()) return;
    const newPost = {
      id: 'POST-' + Math.random().toString(36).slice(2, 8),
      author: 'You',
      content: form.content,
      category: form.category,
      timestamp: new Date().toLocaleString(),
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setForm({ content: '', category: 'Announcement' });
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>Social Feed & Engagement</h1>
      <div className="card">
        <div className="row" style={{ gap: 10 }}>
          <select className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option>Announcement</option>
            <option>Contest</option>
            <option>Club</option>
            <option>Event</option>
            <option>Notice</option>
          </select>
          <input className="input" placeholder="Share an update..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          <button className="btn" onClick={addPost}>Post</button>
        </div>
      </div>
      <div className="grid" style={{ gap: 12 }}>
        {posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}