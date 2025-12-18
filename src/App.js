// src/App.js
import React, { useState } from 'react';

// --- THEME & CONSTANTS ---
const THEME = {
  accent: '#6366f1',
  bg: '#020617',
  card: 'rgba(30, 41, 59, 0.7)',
  textMuted: '#94a3b8',
  success: '#4ade80'
};

const INITIAL_CHALLENGES = [
  {
    id: 1,
    title: 'Optimise Ambattur Traffic Grid',
    cat: 'Logistics',
    status: 'Open',
    votes: 42,
    solutions: [
      { id: 1, text: 'Baseline solution: Deploy adaptive traffic signal control using real-time sensor data.' }
    ],
    comments: []
  },
  {
    id: 2,
    title: 'Campus Energy Leak Detection',
    cat: 'Energy',
    status: 'Solved',
    votes: 18,
    solutions: [
      { id: 1, text: 'Baseline solution: Use smart meters and thermal cameras to identify high-loss zones.' }
    ],
    comments: []
  },
  {
    id: 3,
    title: 'Quantum Encryption for Medical Records',
    cat: 'Security',
    status: 'Open',
    votes: 156,
    solutions: [
      { id: 1, text: 'Baseline solution: Implement QKD-backed key exchange with hybrid classical storage.' }
    ],
    comments: []
  },
  {
    id: 4,
    title: 'Smart Port Cargo Scheduling',
    cat: 'Logistics',
    status: 'Open',
    votes: 89,
    solutions: [
      { id: 1, text: 'Baseline solution: Use priority queues and berth prediction to reduce ship idle time.' }
    ],
    comments: []
  },
  {
    id: 5,
    title: 'AI-Driven Carbon Credit Tracking',
    cat: 'Environment',
    status: 'Open',
    votes: 67,
    solutions: [
      { id: 1, text: 'Baseline solution: Tokenize credits on-chain and match against verified emissions data.' }
    ],
    comments: []
  },
  {
    id: 6,
    title: 'Predictive Maintenance for Wind Turbines',
    cat: 'Energy',
    status: 'Open',
    votes: 34,
    solutions: [
      { id: 1, text: 'Baseline solution: Train anomaly detection models on vibration and SCADA logs.' }
    ],
    comments: []
  },
  {
    id: 7,
    title: 'Satellite Debris Collision Avoidance',
    cat: 'SpaceTech',
    status: 'Open',
    votes: 210,
    solutions: [
      { id: 1, text: 'Baseline solution: Fuse radar and optical tracks to generate early maneuver advisories.' }
    ],
    comments: []
  },
  {
    id: 8,
    title: 'Blockchain Supply Chain Transparency',
    cat: 'Finance',
    status: 'Open',
    votes: 45,
    solutions: [
      { id: 1, text: 'Baseline solution: Record critical handoff events as signed transactions on a shared ledger.' }
    ],
    comments: []
  },
  {
    id: 9,
    title: 'Urban Water Distribution Optimization',
    cat: 'Infrastructure',
    status: 'Open',
    votes: 77,
    solutions: [
      { id: 1, text: 'Baseline solution: Optimize pump schedules based on demand forecasting and tank levels.' }
    ],
    comments: []
  },
  {
    id: 10,
    title: 'High-Frequency Trading Latency Reduction',
    cat: 'Finance',
    status: 'Open',
    votes: 12,
    solutions: [
      { id: 1, text: 'Baseline solution: Co-locate matching engines and streamline network hops.' }
    ],
    comments: []
  },
  {
    id: 11,
    title: 'Genomic Sequence Alignment Speedup',
    cat: 'BioTech',
    status: 'Open',
    votes: 134,
    solutions: [
      { id: 1, text: 'Baseline solution: Use GPU-accelerated approximate matching for large read sets.' }
    ],
    comments: []
  },
  {
    id: 12,
    title: 'Electric Vehicle Charging Station Placement',
    cat: 'Logistics',
    status: 'Open',
    votes: 92,
    solutions: [
      { id: 1, text: 'Baseline solution: Place stations via demand clustering and driving-range coverage.' }
    ],
    comments: []
  },
  {
    id: 13,
    title: 'Real-time Wildfire Spread Prediction',
    cat: 'Emergency',
    status: 'Open',
    votes: 305,
    solutions: [
      { id: 1, text: 'Baseline solution: Combine weather feeds with fuel maps in a real-time simulation.' }
    ],
    comments: []
  },
  {
    id: 14,
    title: 'Micro-Grid Frequency Stabilization',
    cat: 'Energy',
    status: 'Open',
    votes: 56,
    solutions: [
      { id: 1, text: 'Baseline solution: Deploy fast-acting inverters with droop control strategies.' }
    ],
    comments: []
  },
  {
    id: 15,
    title: 'Autonomous Drone Swarm Coordination',
    cat: 'Robotics',
    status: 'Open',
    votes: 88,
    solutions: [
      { id: 1, text: 'Baseline solution: Use consensus-based flocking with collision avoidance rules.' }
    ],
    comments: []
  },
  {
    id: 16,
    title: 'Personalized Cancer Treatment Modeling',
    cat: 'Health',
    status: 'Open',
    votes: 198,
    solutions: [
      { id: 1, text: 'Baseline solution: Build digital twins from genomic and treatment-response histories.' }
    ],
    comments: []
  },
  {
    id: 17,
    title: 'Quantum-Safe Voting Infrastructure',
    cat: 'GovTech',
    status: 'Open',
    votes: 44,
    solutions: [
      { id: 1, text: 'Baseline solution: Use post-quantum signatures for ballots and audit trails.' }
    ],
    comments: []
  },
  {
    id: 18,
    title: 'Global Logistic Route Minimization',
    cat: 'Logistics',
    status: 'Open',
    votes: 112,
    solutions: [
      { id: 1, text: 'Baseline solution: Run multi-objective routing with congestion-aware costs.' }
    ],
    comments: []
  },
  {
    id: 19,
    title: 'Ocean Plastic Concentration Mapping',
    cat: 'Environment',
    status: 'Open',
    votes: 63,
    solutions: [
      { id: 1, text: 'Baseline solution: Derive hotspot maps from satellite imagery and drift models.' }
    ],
    comments: []
  },
  {
    id: 20,
    title: 'Next-Gen Solid State Battery Simulation',
    cat: 'Energy',
    status: 'Open',
    votes: 145,
    solutions: [
      { id: 1, text: 'Baseline solution: Use finite-element models calibrated with lab cell measurements.' }
    ],
    comments: []
  }
];

// --- DASHBOARD PAGE ---
const DashboardPage = ({ challenges, setChallenges }) => {
  const [newTitle, setNewTitle] = useState('');

  const handleDeploy = () => {
    if (!newTitle.trim()) return;
    const newChallenge = {
      id: Date.now(),
      title: newTitle.trim(),
      cat: 'User Input',
      status: 'Open',
      votes: 0,
      solutions: [],
      comments: []
    };
    setChallenges([newChallenge, ...challenges]);
    setNewTitle('');
  };

  return (
    <div className="view-fade">
      <h1>Innovation Dashboard</h1>
      <div className="promo-box" style={{ marginBottom: '30px' }}>
        <h3>Deploy New Challenge Node</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input
            placeholder="Describe the optimization challenge..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ margin: 0 }}
          />
          <button className="btn-main" style={{ width: '200px' }} onClick={handleDeploy}>
            Deploy
          </button>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Challenge Previews ({challenges.length})</h2>
      <div className="dashboard-preview-grid">
        {challenges.map((c) => (
          <div key={c.id} className="preview-pill">
            <span className="dot"></span>
            <span className="pill-title">{c.title}</span>
            <span className="pill-cat">{c.cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SETTINGS PAGE ---
const SettingsPage = ({ activeUser, allUsers, onSwitch, onLogout, onLoginNew }) => (
  <div className="view-fade">
    <h1>Account Management</h1>
    <div className="card" style={{ maxWidth: '500px' }}>
      <h3>Active Session</h3>
      <div className="user-profile">
        <div className="avatar">{activeUser.email[0].toUpperCase()}</div>
        <div>
          <strong>{activeUser.email}</strong>
          <div style={{ color: THEME.textMuted, fontSize: '0.8rem' }}>Current Operator</div>
        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>Switch User</h3>
      <div className="user-list">
        {allUsers.map((u) => (
          <div
            key={u.email}
            className={`user-item ${u.email === activeUser.email ? 'active' : ''}`}
            onClick={() => onSwitch(u)}
          >
            {u.email} {u.email === activeUser.email && '(Active)'}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <button className="btn-secondary" onClick={onLoginNew}>
          + Add User
        </button>
        <button className="btn-main" style={{ background: '#ef4444' }} onClick={onLogout}>
          Logout All
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('auth');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [isSignUp, setIsSignUp] = useState(false);
  const [authData, setAuthData] = useState({ email: '', pass: '', confirmPass: '' });
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);

  const [solutionDrafts, setSolutionDrafts] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && authData.pass !== authData.confirmPass) {
      window.alert('Passwords do not match');
      return;
    }

    const newUser = { email: authData.email };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setView('dashboard');
    setAuthData({ email: '', pass: '', confirmPass: '' });
  };

  const handleChangeAuth = (field, value) => {
    setAuthData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVote = (id) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );
  };

  const handleAddSolution = (id) => {
    const text = (solutionDrafts[id] || '').trim();
    if (!text) return;

    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              solutions: [...c.solutions, { id: Date.now(), text }]
            }
          : c
      )
    );
    setSolutionDrafts((prev) => ({ ...prev, [id]: '' }));
  };

  const handleAddComment = (id) => {
    const text = (commentDrafts[id] || '').trim();
    if (!text) return;

    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              comments: [...c.comments, { id: Date.now(), text }]
            }
          : c
      )
    );
    setCommentDrafts((prev) => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="app-shell">
      <style>{`
        body { margin:0; background:${THEME.bg}; color:white; font-family:'Inter',sans-serif; }
        .app-shell { display:flex; min-height:100vh; }

        aside { width:260px; background:rgba(15,23,42,0.9); border-right:1px solid rgba(255,255,255,0.1); padding:40px 20px; display:flex; flex-direction:column; }
        .nav-link { padding:14px; cursor:pointer; color:#94a3b8; border-radius:12px; margin-bottom:8px; transition:0.2s; }
        .nav-link.active { background:rgba(99,102,241,0.15); color:white; }

        main { flex:1; padding:60px; overflow-y:auto; }
        .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:25px; }
        .card { background:${THEME.card}; border:1px solid rgba(255,255,255,0.1); padding:25px; border-radius:24px; backdrop-filter:blur(12px); }

        .dashboard-preview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .preview-pill { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; }
        .preview-pill .dot { width: 8px; height: 8px; border-radius: 50%; background: ${THEME.accent}; box-shadow: 0 0 8px ${THEME.accent}; }
        .pill-title { flex: 1; font-size: 0.9rem; font-weight: 500; }
        .pill-cat { font-size: 0.7rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; }

        .user-profile { display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 15px; }
        .avatar { width: 40px; height: 40px; background: ${THEME.accent}; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .user-list { margin-top: 10px; }
        .user-item { padding: 12px; border-radius: 10px; cursor: pointer; margin-bottom: 5px; border: 1px solid transparent; }
        .user-item:hover { background: rgba(255,255,255,0.05); }
        .user-item.active { border-color: ${THEME.accent}; background: rgba(99,102,241,0.1); }

        input { width:100%; padding:14px; margin:10px 0; background:#1e293b; border:1px solid #334155; color:white; border-radius:12px; box-sizing:border-box; }
        textarea { width:100%; padding:12px; margin:8px 0; background:#020617; border:1px solid #334155; color:white; border-radius:12px; box-sizing:border-box; resize:vertical; min-height:70px; }
        .btn-main { background:${THEME.accent}; color:white; border:none; padding:14px; border-radius:12px; font-weight:bold; cursor:pointer; width:100%; }
        .btn-secondary { background:rgba(255,255,255,0.05); color:#818cf8; border:1px solid rgba(129,140,248,0.2); border-radius:8px; padding:10px; cursor:pointer; width:100%; }
        .promo-box { background:linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1)); padding:30px; border-radius:24px; border-left:5px solid ${THEME.accent}; }
        .view-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .toggle-text { color:${THEME.accent}; cursor:pointer; margin-top:15px; font-size:0.9rem; text-align:center; }

        .meta-row { display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; margin-bottom:10px; color:${THEME.textMuted}; }
        .vote-btn { background:rgba(34,197,94,0.1); color:${THEME.success}; border:1px solid rgba(34,197,94,0.5); padding:6px 10px; border-radius:999px; cursor:pointer; font-size:0.75rem; }

        .solution-list, .comment-list { margin-top:8px; font-size:0.8rem; color:${THEME.textMuted}; max-height:100px; overflow-y:auto; }
        .solution-item, .comment-item { padding:4px 0; border-bottom:1px solid rgba(148,163,184,0.2); }
      `}</style>

      {currentUser && (
        <aside>
          <h2 style={{ color: THEME.accent, marginBottom: '40px', letterSpacing: '-1px' }}>Q.LAB</h2>
          <nav style={{ flex: 1 }}>
            <div
              className={`nav-link ${view === 'dashboard' ? 'active' : ''}`}
              onClick={() => setView('dashboard')}
            >
              📊 Dashboard
            </div>
            <div
              className={`nav-link ${view === 'network' ? 'active' : ''}`}
              onClick={() => setView('network')}
            >
              🌍 Network
            </div>
            <div
              className={`nav-link ${view === 'nodes' ? 'active' : ''}`}
              onClick={() => setView('nodes')}
            >
              ⚡ Nodes
            </div>
            <div
              className={`nav-link ${view === 'settings' ? 'active' : ''}`}
              onClick={() => setView('settings')}
            >
              ⚙️ Settings
            </div>
          </nav>
          <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.7rem', color: THEME.textMuted }}>OPERATOR</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{currentUser.email}</div>
          </div>
        </aside>
      )}

      <main>
        {!currentUser || view === 'auth' ? (
          <div className="auth-container">
            <div className="auth-card">
              <h2>{isSignUp ? 'New Operator' : 'System Login'}</h2>
              <form onSubmit={handleAuthSubmit}>
                <input
                  name="email"
                  placeholder="Email"
                  value={authData.email}
                  onChange={(e) => handleChangeAuth('email', e.target.value)}
                  required
                />
                <input
                  name="pass"
                  type="password"
                  placeholder="Password"
                  value={authData.pass}
                  onChange={(e) => handleChangeAuth('pass', e.target.value)}
                  required
                />
                {isSignUp && (
                  <input
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                    value={authData.confirmPass}
                    onChange={(e) => handleChangeAuth('confirmPass', e.target.value)}
                    required
                  />
                )}
                <button className="btn-main" type="submit">
                  Authenticate
                </button>
              </form>
              <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-text">
                {isSignUp ? 'Already registered? Login' : 'New operator? Sign Up'}
              </p>
              {users.length > 0 && (
                <p
                  onClick={() => setView('settings')}
                  style={{ cursor: 'pointer', color: THEME.textMuted, marginTop: '10px' }}
                >
                  Cancel
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            {view === 'dashboard' && (
              <DashboardPage challenges={challenges} setChallenges={setChallenges} />
            )}

            {view === 'network' && (
              <div className="view-fade">
                <h2>Global Solutions Network</h2>
                <div className="grid">
                  {challenges.map((c) => (
                    <div key={c.id} className="card">
                      <div className="meta-row">
                        <span style={{ color: THEME.accent, fontWeight: 'bold' }}>{c.cat}</span>
                        <span>
                          Votes: <strong>{c.votes}</strong>
                        </span>
                      </div>
                      <h3>{c.title}</h3>

                      <div style={{ margin: '8px 0' }}>
                        <button
                          className="vote-btn"
                          type="button"
                          onClick={() => handleVote(c.id)}
                        >
                          ▲ Upvote
                        </button>
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        <label style={{ fontSize: '0.8rem', color: THEME.textMuted }}>
                          Submit Solution
                        </label>
                        <textarea
                          placeholder="Type your solution here..."
                          value={solutionDrafts[c.id] || ''}
                          onChange={(e) =>
                            setSolutionDrafts((prev) => ({ ...prev, [c.id]: e.target.value }))
                          }
                        />
                        <button
                          className="btn-secondary"
                          type="button"
                          onClick={() => handleAddSolution(c.id)}
                        >
                          Promote Solution
                        </button>

                        {c.solutions.length > 0 && (
                          <div className="solution-list">
                            {c.solutions.map((s) => (
                              <div key={s.id} className="solution-item">
                                {s.text}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        <label style={{ fontSize: '0.8rem', color: THEME.textMuted }}>
                          Comments
                        </label>
                        <input
                          placeholder="Add a comment..."
                          value={commentDrafts[c.id] || ''}
                          onChange={(e) =>
                            setCommentDrafts((prev) => ({ ...prev, [c.id]: e.target.value }))
                          }
                        />
                        <button
                          className="btn-secondary"
                          type="button"
                          onClick={() => handleAddComment(c.id)}
                        >
                          Add Comment
                        </button>

                        {c.comments.length > 0 && (
                          <div className="comment-list">
                            {c.comments.map((cm) => (
                              <div key={cm.id} className="comment-item">
                                {cm.text}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === 'nodes' && (
              <div className="view-fade">
                <div className="promo-box">
                  <h1>The Q.LAB Story</h1>
                  <p>
                    Our journey began by tackling <strong>NP-Hard complexity</strong> in logistics.
                    We overcame hurdles in quantum decoherence simulation to build a distributed mesh
                    that optimizes energy and infrastructure in real-time. Q.LAB stands as a bold, future‑first community where ambitious builders, curious students, and seasoned innovators converge to tackle the hardest real‑world problems with a mix of rigor, creativity, and unapologetic ambition.
                    It is not just another hackathon space or coding forum; it is a living ecosystem of people who genuinely believe that NP‑hard logistics, urban optimization, quantum‑safe security, climate resilience, and next‑gen healthcare are solvable when the right minds connect around the right challenges.
                    Inside Q.LAB, every challenge card is a story waiting to be rewritten by the community: traffic grids become playgrounds for optimization nerds, wildfire prediction becomes a collaboration between data scientists and first‑responders, and quantum encryption turns from intimidating theory into practical, co‑designed protocols.
                    Members do not simply “submit ideas”; they deploy challenge nodes, promote solutions, iterate publicly, vote on what matters, and leave visible trace of their thinking, so that anyone joining later can stand on their shoulders instead of starting from scratch.
                    Culture matters here as much as code: respectful debate is encouraged, ego is checked at the door, and the default posture is to help others ship better solutions—whether by leaving a sharp comment, suggesting an alternative architecture, or stress‑testing assumptions with real‑world constraints.
                    Over time, Q.LAB becomes a reputation engine: people are known not by titles or degrees, but by the clarity of their models, the robustness of their experiments, and the impact of the solutions they help bring to life.
                    The community’s diversity of backgrounds—spanning logistics, robotics, energy, finance, biotech, and more—means that no problem is ever viewed through a single disciplinary lens; instead, ideas collide, recombine, and evolve into designs that a lone expert could never have reached.
                    Q.LAB is the kind of space where a late‑night prototype can grow into an open‑source standard, where a comment thread can unlock a breakthrough, and where every new member, no matter how “junior” they feel, is treated as a potential co‑author of the next big leap in global problem‑solving.
                  </p>
                  <p>
                    This innovation hub fragments workloads across community nodes, proving that
                    collective intelligence is the future of urban solving.
                  </p>
                </div>
              </div>
            )}

            {view === 'settings' && (
              <SettingsPage
                activeUser={currentUser}
                allUsers={users}
                onSwitch={(u) => {
                  setCurrentUser(u);
                  setView('dashboard');
                }}
                onLogout={() => {
                  setUsers([]);
                  setCurrentUser(null);
                  setView('auth');
                }}
                onLoginNew={() => setView('auth')}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
