import Badge from '../components/Badge.jsx';
import Leaderboard from '../components/Leaderboard.jsx';
import { badges } from '../data/badges.js';
import { leaderboard } from '../data/leaderboard.js';

export default function Gamification() {
  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>Gamification & Motivation</h1>
      <div className="grid cols-3">
        {badges.map((b, i) => <Badge key={i} name={b.name} desc={b.desc} />)}
      </div>
      <Leaderboard title="Co-curricular Leaderboard" items={leaderboard} />
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Top Performer of the Month</div>
        <div className="row" style={{ alignItems: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: '#3b82f6', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
            {leaderboard[0].name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{leaderboard[0].name}</div>
            <div className="muted">For outstanding participation and leadership</div>
          </div>
          <button className="btn ghost" onClick={() => alert('Recognition posted to feed (demo).')}>Announce</button>
        </div>
      </div>
    </div>
  );
}