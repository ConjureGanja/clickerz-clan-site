import { useEffect, useState } from "react";

const WOM_GROUP_ID = 21596;

function SectionBadge({ children, tone = "sky" }) {
  const tones = {
    sky:    { color: "#87ceeb", bg: "rgba(135,206,235,0.1)" },
    gold:   { color: "#ffd700", bg: "rgba(255,215,0,0.1)" },
    purple: { color: "#7c8aff", bg: "rgba(124,138,255,0.1)" },
    teal:   { color: "#56c8e8", bg: "rgba(86,200,232,0.1)" },
  };

  return (
    <span
      className="section-badge"
      style={{ color: tones[tone].color, background: tones[tone].bg }}
    >
      {children}
    </span>
  );
}

export default function Stats() {
  const [achievements, setAchievements] = useState([]);
  const [records, setRecords] = useState([]);
  const [gains, setGains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, recRes, gainRes] = await Promise.all([
          fetch(`https://api.wiseoldman.net/v2/groups/${WOM_GROUP_ID}/achievements?limit=10`),
          fetch(`https://api.wiseoldman.net/v2/groups/${WOM_GROUP_ID}/records?limit=10&period=week`),
          fetch(`https://api.wiseoldman.net/v2/groups/${WOM_GROUP_ID}/gains?limit=10&period=week&metric=overall`)
        ]);

        const achData = await achRes.json();
        const recData = await recRes.json();
        const gainData = await gainRes.json();

        setAchievements(achData);
        setRecords(recData);
        setGains(gainData);
      } catch (error) {
        console.error("Error fetching WOM stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatValue = (val) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
    return val;
  };

  return (
    <div className="stats-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Clan Hall of Fame</SectionBadge>
          <h1 className="hero-title">Clan <span>Stats</span></h1>
          <p className="hero-subtitle">
            Tracking the massive gains and achievements of the Clickerz family.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="values-grid">
            {/* Recent Achievements / Drops */}
            <div className="leaderboard-card" style={{ gridColumn: 'span 1' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontFamily: '"Press Start 2P", monospace', fontSize: '12px', color: 'var(--gold)' }}>
                  Recent Achievements
                </h3>
              </div>
              {loading ? (
                <div className="leaderboard-loading">Loading achievements...</div>
              ) : achievements.length > 0 ? (
                achievements.map((ach, i) => (
                  <div key={i} className="leaderboard-row">
                    <div className="leaderboard-icon">🏆</div>
                    <div className="leaderboard-name" style={{ fontSize: '14px' }}>
                      {ach.player.displayName}
                      <div style={{ fontSize: '11px', color: 'var(--text-soft)', fontWeight: 400 }}>
                        {ach.name}
                      </div>
                    </div>
                    <div className="leaderboard-value" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {new Date(ach.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="leaderboard-loading">No recent achievements found.</div>
              )}
            </div>

            {/* Weekly Records */}
            <div className="leaderboard-card" style={{ gridColumn: 'span 1' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontFamily: '"Press Start 2P", monospace', fontSize: '12px', color: 'var(--sky)' }}>
                  Weekly Records
                </h3>
              </div>
              {loading ? (
                <div className="leaderboard-loading">Loading records...</div>
              ) : records.length > 0 ? (
                records.map((rec, i) => (
                  <div key={i} className="leaderboard-row">
                    <div className="leaderboard-rank">{i + 1}</div>
                    <div className="leaderboard-name" style={{ fontSize: '14px' }}>
                      {rec.player.displayName}
                      <div style={{ fontSize: '11px', color: 'var(--text-soft)', fontWeight: 400 }}>
                        {rec.metric.replace(/_/g, ' ')}
                      </div>
                    </div>
                    <div className="leaderboard-value">
                      {formatValue(rec.value)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="leaderboard-loading">No records this week.</div>
              )}
            </div>
          </div>

          <div className="leaderboard-card" style={{ marginTop: '2rem' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ margin: 0, fontFamily: '"Press Start 2P", monospace', fontSize: '12px', color: 'var(--teal)' }}>
                Top Gainers (Overall XP - Weekly)
              </h3>
            </div>
            {loading ? (
              <div className="leaderboard-loading">Loading gains...</div>
            ) : gains.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {gains.map((gain, i) => (
                  <div key={i} className="leaderboard-row" style={{ borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none' }}>
                    <div className="leaderboard-rank">{i + 1}</div>
                    <div className="leaderboard-name">
                      {gain.player.displayName}
                    </div>
                    <div className="leaderboard-change">
                      ▲ {formatValue(gain.data.gained)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="leaderboard-loading">No gains recorded this week.</div>
            )}
          </div>
        </div>
      </section>

      <section className="page-section page-section--gradient">
        <div className="container narrow center-text">
          <SectionBadge tone="purple">Fun Stats</SectionBadge>
          <h2 className="section-title">Did You Know?</h2>
          <div className="hero-stats" style={{ marginTop: '2rem' }}>
            <div className="stat-card">
              <div className="stat-card__value">∞</div>
              <div className="stat-card__label">Clicks Logged</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">100%</div>
              <div className="stat-card__label">Effort Provided</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">0</div>
              <div className="stat-card__label">Exp Waste Allowed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
