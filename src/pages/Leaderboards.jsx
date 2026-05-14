import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionBadge from "../components/SectionBadge";
import {
  fetchGroup,
  fetchGroupAchievements,
  fetchGroupGains,
  fetchGroupHiscores,
  fetchGroupRecords,
  formatAchievementName,
  getGainedValue,
  getHiscoreValue,
  getPlayerDisplayName,
} from "../utils/wom";

const WOM_GROUP_ID = 21596;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function formatValue(val, suffix = "") {
  if (val === null || val === undefined) return "—";
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
    let cancelled = false;

    const loadWomData = async () => {
      const [
        groupResult,
        overallResult,
        ehbResult,
        ehpResult,
        wXPResult,
        wEHBResult,
        mXPResult,
        mEHBResult,
        achievementsResult,
        recordsResult,
      ] = await Promise.allSettled([
        fetchGroup(WOM_GROUP_ID),
        fetchGroupHiscores(WOM_GROUP_ID, "overall", 15),
        fetchGroupHiscores(WOM_GROUP_ID, "ehb", 15),
        fetchGroupHiscores(WOM_GROUP_ID, "ehp", 15),
        fetchGroupGains(WOM_GROUP_ID, { period: "week", metric: "overall", limit: 10 }),
        fetchGroupGains(WOM_GROUP_ID, { period: "week", metric: "ehb", limit: 10 }),
        fetchGroupGains(WOM_GROUP_ID, { period: "month", metric: "overall", limit: 10 }),
        fetchGroupGains(WOM_GROUP_ID, { period: "month", metric: "ehb", limit: 10 }),
        fetchGroupAchievements(WOM_GROUP_ID, 20),
        fetchGroupRecords(WOM_GROUP_ID, { period: "week", limit: 10 }),
      ]);

      if (cancelled) return;

      if (groupResult.status === "fulfilled") {
        setGroupInfo(groupResult.value);
      }

      setHiscores({
        overall: overallResult.status === "fulfilled"
          ? overallResult.value.map((e, i) => ({
              rank: i + 1,
              name: getPlayerDisplayName(e),
              value: Math.round(getHiscoreValue(e, "overall")).toLocaleString(),
            }))
          : [],
        ehb: ehbResult.status === "fulfilled"
          ? ehbResult.value.map((e, i) => ({
              rank: i + 1,
              name: getPlayerDisplayName(e),
              value: `${Math.round(getHiscoreValue(e, "ehb")).toLocaleString()} EHB`,
            }))
          : [],
        ehp: ehpResult.status === "fulfilled"
          ? ehpResult.value.map((e, i) => ({
              rank: i + 1,
              name: getPlayerDisplayName(e),
              value: `${Math.round(getHiscoreValue(e, "ehp")).toLocaleString()} EHP`,
            }))
          : [],
      });
      setHiscoresLoading(false);

      const toRows = (result, metric) =>
        result.status === "fulfilled"
          ? result.value.map((e, i) => {
              const gained = Number(getGainedValue(e, metric)) || 0;
              return {
                rank: i + 1,
                name: getPlayerDisplayName(e),
                rawGained: gained,
                value: formatValue(gained),
                change: formatValue(gained),
              };
            })
          : [];

      setGainers({
        weekXP: toRows(wXPResult, "overall"),
        weekEHB: toRows(wEHBResult, "ehb"),
        monthXP: toRows(mXPResult, "overall"),
        monthEHB: toRows(mEHBResult, "ehb"),
      });
      setGainersLoading(false);

      setAchievements(
        achievementsResult.status === "fulfilled"
          ? achievementsResult.value
          : []
      );
      setAchLoading(false);

      setRecords(
        recordsResult.status === "fulfilled"
          ? recordsResult.value
          : []
      );
      setRecordsLoading(false);
    };

    loadWomData();
    const refreshTimer = setInterval(loadWomData, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(refreshTimer);
    };
  }, []);

  // Derive fun stats using raw numeric values stored alongside the formatted strings
  const totalWeeklyXP = gainers.weekXP.reduce((sum, r) => sum + (r.rawGained ?? 0), 0);

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
                        {getPlayerDisplayName(ach)}
                        <div style={{ fontSize: "11px", color: "var(--text-soft)", fontWeight: 400, marginTop: "2px" }}>
                          {formatAchievementName(ach)}
                        </div>
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", textAlign: "right", whiteSpace: "nowrap" }}>
                        {ach.createdAt || ach.updatedAt
                          ? new Date(ach.createdAt ?? ach.updatedAt).toLocaleDateString()
                          : "—"}
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
                      {getPlayerDisplayName(rec)}
                      <div style={{ fontSize: "11px", color: "var(--text-soft)", fontWeight: 400, marginTop: "2px" }}>
                        {(rec.metric ?? "overall").replace(/_/g, " ")}
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
