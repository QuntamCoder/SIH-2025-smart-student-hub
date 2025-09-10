import { profile } from '../data/profile.js';
import { downloadJSON } from '../utils/download.js';

export default function Profile() {
  const shareLink = `https://portfolio.example.com/${profile.username}`;
  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1>Student Profile & Portfolio</h1>
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="row">
            <div style={{ width: 56, height: 56, borderRadius: 999, background: '#1f2937', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
              {profile.name.split(' ').map(s => s[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{profile.name}</div>
              <div className="muted">{profile.program} • {profile.year}</div>
            </div>
          </div>
          <div className="row">
            <button className="btn ghost" onClick={() => navigator.clipboard.writeText(shareLink)}>Copy Share Link</button>
            <button className="btn" onClick={() => downloadJSON('portfolio.json', profile)}>Export Portfolio (JSON)</button>
          </div>
        </div>
      </div>

      <div className="grid cols-2">
        <Section title="Academics">
          <ul>
            {profile.academics.map((a, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{a.title} — CGPA: {a.cgpa}</div>
                <div className="muted" style={{ fontSize: 12 }}>{a.year} • {a.institution}</div>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Certifications">
          <ListWithVerify items={profile.certifications} />
        </Section>
        <Section title="Projects">
          <ListWithVerify items={profile.projects} />
        </Section>
        <Section title="Internships">
          <ListWithVerify items={profile.internships} />
        </Section>
        <Section title="Volunteering">
          <ListWithVerify items={profile.volunteering} />
        </Section>
        <Section title="Contests & Leadership">
          <ListWithVerify items={[...profile.contests, ...profile.leadership]} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="card">
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function ListWithVerify({ items }) {
  return (
    <ul>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 8 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{it.title || it.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>
                {it.org || it.organization || it.role || it.position} {it.year ? `• ${it.year}` : ''} {it.duration ? `• ${it.duration}` : ''}
              </div>
            </div>
            <span className={`chip ${it.verified ? 'success' : ''}`}>{it.verified ? 'Verified' : 'Pending'}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}