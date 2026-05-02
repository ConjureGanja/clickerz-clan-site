import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WOM_GROUP_ID = 21596;
const WOM_BASE = "https://api.wiseoldman.net/v2";

function SectionBadge({ children, tone = "sky" }) {
  const tones = {
    sky:    { color: "#87ceeb", bg: "rgba(135,206,235,0.1)" },
    gold:   { color: "#ffd700", bg: "rgba(255,215,0,0.1)" },
    purple: { color: "#7c8aff", bg: "rgba(124,138,255,0.1)" },
    teal:   { color: "#56c8e8", bg: "rgba(86,200,232,0.1)" },
  };
  return (
    <span className="section-badge" style={{ color: tones[tone].color, background: tones[tone].bg }}>
      {children}
    </span>
  );
}

function formatValue(val, suffix = "") {
  if (val == null) return "—";
  const n = Number(val);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M" + suffix;
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k" + suffix;
  return n.toLocaleString() + suffix;
}

function rankIcon(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

function LeaderboardTable({ rows, loading, emptyMsg, valueLabel }) {
  if (loading) {
    return <div className="leaderboard-loading">Loading from Wise Old Man…</div>;
  }
  if (!rows || rows.length === 0) {
    return <div className="leaderboard-loading">{emptyMsg ?? "No data available."}</div>;
  }
  return (
    <div>
      {rows.map((row, i) => (
        <div
          key={row.name + i}
          className={i === 0 ? "leaderboard-row leaderboard-row--first" : "leaderboard-row"}
        >
          <div className="leaderboard-rank">{row.rank}</div>
          <div className="leaderboard-icon">{rankIcon(row.rank) ?? (valueLabel === "EHB" ? "🐉" : "⚔️")}</div>
          <div className="leaderboard-name">{row.name}</div>
          {row.change != null && (
            <div className="leaderboard-change">▲ {row.change}</div>
          )}
          <div className="leaderboard-value">{row.value}</div>
        </div>
      ))}
    </div>
  );
}

function TabPanel({ tabs, activeTab, setActiveTab, children }) {
  return (
    <>
      <div className="tab-switcher">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={activeTab === tab.key ? "tab-button tab-button--active" : "tab-button"}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children}
    </>
  );
}

export default function Leaderboards() {
  // ── Top Members (hiscores) ──────────────────────────
  const [hiscores, setHiscores] = useState({ overall: [], ehb: [], ehp: [] });
  const [hiscoresLoading, setHiscoresLoading] = useState(true);
  const [hiscoresTab, setHiscoresTab] = useState("overall");

  // ── Gainers ─────────────────────────────────────────
  const [gainers, setGainers] = useState({ weekXP: [], weekEHB: [], monthXP: [], monthEHB: [] });
  const [gainersLoading, setGainersLoading] = useState(true);
  const [gainersPeriod, setGainersPeriod] = useState("week");
  const [gainersMetric, setGainersMetric] = useState("overall");

  // ── Achievements ─────────────────────────────────────
  const [achievements, setAchievements] = useState([]);
  const [achLoading, setAchLoading] = useState(true);

  // ── Records ──────────────────────────────────────────
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);

  // ── Fun Stats ─────────────────────────────────────────
  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    // Group info
    fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}`)
      .then((r) => r.json())
      .then(setGroupInfo)
      .catch(() => {});

    // Hiscores
    Promise.allSettled([
      fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/hiscores?metric=overall&limit=15`).then((r) => r.json()),
      fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/hiscores?metric=ehb&limit=15`).then((r) => r.json()),
      fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/hiscores?metric=ehp&limit=15`).then((r) => r.json()),
    ]).then(([overall, ehb, ehp]) => {
      setHiscores({
        overall: overall.status === "fulfilled"
          ? overall.value.map((e, i) => ({ rank: i + 1, name: e.player.displayName, value: (e.data.level ?? 0).toLocaleString() }))
          : [],
        ehb: ehb.status === "fulfilled"
          ? ehb.value.map((e, i) => ({ rank: i + 1, name: e.player.displayName, value: `${Math.round(e.data.value ?? 0).toLocaleString()} EHB` }))
          : [],
        ehp: ehp.status === "fulfilled"
          ? ehp.value.map((e, i) => ({ rank: i + 1, name: e.player.displayName, value: `${Math.round(e.data.value ?? 0).toLocaleString()} EHP` }))
          : [],
      });
      setHiscoresLoading(false);
    });

    // Gainers
    Promise.allSettled([
      fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=week&metric=overall&limit=10`).then((r) => r.json()),
      fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=week&metric=ehb&limit=10`).then((r) => r.json()),
      fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=month&metric=overall&limit=10`).then((r) => r.json()),
      fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=month&metric=ehb&limit=10`).then((r) => r.json()),
    ]).then(([wXP, wEHB, mXP, mEHB]) => {
      const toRows = (result) =>
        result.status === "fulfilled"
          ? result.value.map((e, i) => ({
              rank: i + 1,
              name: e.player.displayName,
              value: formatValue(e.data.gained),
              change: formatValue(e.data.gained),
            }))
          : [];
      setGainers({
        weekXP: toRows(wXP),
        weekEHB: toRows(wEHB),
        monthXP: toRows(mXP),
        monthEHB: toRows(mEHB),
      });
      setGainersLoading(false);
    });

    // Achievements
    fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/achievements?limit=20`)
      .then((r) => r.json())
      .then((data) => {
        setAchievements(Array.isArray(data) ? data : []);
        setAchLoading(false);
      })
      .catch(() => setAchLoading(false));

    // Records
    fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/records?period=week&limit=10`)
      .then((r) => r.json())
      .then((data) => {
        setRecords(Array.isArray(data) ? data : []);
        setRecordsLoading(false);
      })
      .catch(() => setRecordsLoading(false));
  }, []);

  // Derive fun stats from already-fetched data
  const totalWeeklyXP = gainers.weekXP.reduce((sum, r) => {
    const raw = r.value.replace(/[^0-9.]/g, "");
    const mul = r.value.endsWith("M") ? 1_000_000 : r.value.endsWith("k") ? 1_000 : 1;
    return sum + parseFloat(raw || 0) * mul;
  }, 0);

  const achCount = achievements.length;
  const recordCount = records.length;

  const activeGainersKey = gainersPeriod === "week"
    ? (gainersMetric === "overall" ? "weekXP" : "weekEHB")
    : (gainersMetric === "overall" ? "monthXP" : "monthEHB");

  const hiscoreRows = hiscores[hiscoresTab] ?? [];

  return (
    <div className="leaderboards-page">
      {/* ── Hero ── */}
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Hall of Fame</SectionBadge>
          <h1 className="hero-title">Clan <span>Leaderboards</span></h1>
          <p className="hero-subtitle">
            Live stats pulled straight from Wise Old Man. Updated every time a player syncs.
          </p>
        </div>
      </section>

      {/* ── Fun Stats Strip ── */}
      <section className="page-section" style={{ paddingBottom: "0" }}>
        <div className="container">
          <div className="fun-stats-strip">
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {groupInfo ? groupInfo.memberCount : "—"}
              </div>
              <div className="fun-stat-card__label">Active Members</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {gainersLoading ? "—" : formatValue(totalWeeklyXP)}
              </div>
              <div className="fun-stat-card__label">Total XP This Week</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {achLoading ? "—" : achCount}
              </div>
              <div className="fun-stat-card__label">Recent Milestones</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {recordsLoading ? "—" : recordCount}
              </div>
              <div className="fun-stat-card__label">Records This Week</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Clan Members ── */}
      <section className="page-section">
        <div className="container narrow">
          <div className="section-header">
            <SectionBadge tone="sky">Rankings</SectionBadge>
            <h2 className="section-title">Top Clan Members</h2>
            <p className="section-subtitle">Overall level, bossing efficiency, and skilling dedication.</p>
          </div>

          <TabPanel
            tabs={[
              { key: "overall", label: "⚔️ Total Level" },
              { key: "ehb", label: "🐉 Boss EHB" },
              { key: "ehp", label: "🎒 Skill EHP" },
            ]}
            activeTab={hiscoresTab}
            setActiveTab={setHiscoresTab}
          >
            <div className="leaderboard-card">
              <LeaderboardTable
                rows={hiscoreRows}
                loading={hiscoresLoading}
                emptyMsg="No hiscore data yet."
                valueLabel={hiscoresTab === "ehb" ? "EHB" : hiscoresTab === "ehp" ? "EHP" : "Level"}
              />
            </div>
          </TabPanel>
        </div>
      </section>

      {/* ── Gainers ── */}
      <section className="page-section page-section--gradient">
        <div className="container narrow">
          <div className="section-header">
            <SectionBadge tone="teal">Gains</SectionBadge>
            <h2 className="section-title">Top Gainers</h2>
            <p className="section-subtitle">The hardest workers in the clan — this week and this month.</p>
          </div>

          <div className="lboard-period-tabs">
            <div className="tab-switcher" style={{ marginBottom: "0.75rem" }}>
              <button
                type="button"
                className={gainersPeriod === "week" ? "tab-button tab-button--active" : "tab-button"}
                onClick={() => setGainersPeriod("week")}
              >
                📅 This Week
              </button>
              <button
                type="button"
                className={gainersPeriod === "month" ? "tab-button tab-button--active" : "tab-button"}
                onClick={() => setGainersPeriod("month")}
              >
                📆 This Month
              </button>
            </div>
            <div className="tab-switcher">
              <button
                type="button"
                className={gainersMetric === "overall" ? "tab-button tab-button--active" : "tab-button"}
                onClick={() => setGainersMetric("overall")}
              >
                🎒 XP Gained
              </button>
              <button
                type="button"
                className={gainersMetric === "ehb" ? "tab-button tab-button--active" : "tab-button"}
                onClick={() => setGainersMetric("ehb")}
              >
                🐉 Boss Kills
              </button>
            </div>
          </div>

          <div className="leaderboard-card" style={{ marginTop: "1.5rem" }}>
            <LeaderboardTable
              rows={gainers[activeGainersKey]}
              loading={gainersLoading}
              emptyMsg="No gainers recorded yet for this period."
              valueLabel={gainersMetric === "ehb" ? "EHB" : "XP"}
            />
          </div>
        </div>
      </section>

      {/* ── Recent Milestones + Clan Records ── */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <SectionBadge tone="gold">Activity</SectionBadge>
            <h2 className="section-title">Clan Activity</h2>
            <p className="section-subtitle">Recent achievements, 99s, and personal records set by Clickerz.</p>
          </div>

          <div className="lboard-two-col">
            {/* Achievements */}
            <div className="leaderboard-card">
              <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                <h3 style={{ margin: 0, fontFamily: '"Press Start 2P", monospace', fontSize: "11px", color: "var(--gold)" }}>
                  🏆 Recent Milestones
                </h3>
              </div>
              {achLoading ? (
                <div className="leaderboard-loading">Loading achievements…</div>
              ) : achievements.length === 0 ? (
                <div className="leaderboard-loading">No recent achievements found.</div>
              ) : (
                achievements.map((ach, i) => (
                  <div key={i} className="leaderboard-row" style={{ gridTemplateColumns: "36px 1fr auto" }}>
                    <div className="leaderboard-icon">🏆</div>
                    <div className="leaderboard-name" style={{ fontSize: "14px" }}>
                      {ach.player.displayName}
                      <div style={{ fontSize: "11px", color: "var(--text-soft)", fontWeight: 400, marginTop: "2px" }}>
                        {ach.name}
                      </div>
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", textAlign: "right", whiteSpace: "nowrap" }}>
                      {new Date(ach.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Records */}
            <div className="leaderboard-card">
              <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                <h3 style={{ margin: 0, fontFamily: '"Press Start 2P", monospace', fontSize: "11px", color: "var(--sky)" }}>
                  📈 Weekly Records
                </h3>
              </div>
              {recordsLoading ? (
                <div className="leaderboard-loading">Loading records…</div>
              ) : records.length === 0 ? (
                <div className="leaderboard-loading">No records set this week.</div>
              ) : (
                records.map((rec, i) => (
                  <div key={i} className="leaderboard-row" style={{ gridTemplateColumns: "40px 36px 1fr auto" }}>
                    <div className="leaderboard-rank">{i + 1}</div>
                    <div className="leaderboard-icon">📈</div>
                    <div className="leaderboard-name" style={{ fontSize: "14px" }}>
                      {rec.player.displayName}
                      <div style={{ fontSize: "11px", color: "var(--text-soft)", fontWeight: 400, marginTop: "2px" }}>
                        {rec.metric.replace(/_/g, " ")}
                      </div>
                    </div>
                    <div className="leaderboard-value">
                      {formatValue(rec.value)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-section page-section--gradient">
        <div className="container narrow center-text">
          <SectionBadge tone="purple">Compete</SectionBadge>
          <h2 className="section-title">Want to climb the boards?</h2>
          <p className="section-subtitle">
            Join the clan, verify your RSN on WOM, and start competing in weekly SOTW &amp; BOTW events.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href="https://discord.gg/cju3DSSdju" target="_blank" rel="noreferrer" className="button button--primary">
              🎮 Join the Clan
            </a>
            <Link to="/events" className="button button--secondary">
              View Events →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
