import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionBadge from "../components/SectionBadge";
import {
  describeClanActivity,
  fetchLeaderboardSnapshot,
  formatCompactNumber,
  formatMetricName,
  formatPercentage,
  formatRelativeTime,
  RUNEPROFILE_SITE,
  WOM_GROUP_ID,
} from "../utils/leaderboards";

function rankIcon(rank, fallback = "⚔️") {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return fallback;
}

function LeaderboardTable({ rows, loading, emptyMsg, fallbackIcon = "⚔️" }) {
  if (loading) {
    return <div className="leaderboard-loading">Loading leaderboard…</div>;
  }

  if (!rows || rows.length === 0) {
    return <div className="leaderboard-loading">{emptyMsg ?? "No data available."}</div>;
  }

  return (
    <div>
      {rows.map((row, index) => (
        <div
          key={`${row.name}-${row.rank}-${index}`}
          className={index === 0 ? "leaderboard-row leaderboard-row--first" : "leaderboard-row"}
        >
          <div className="leaderboard-rank">{row.rank}</div>
          <div className="leaderboard-icon">{rankIcon(row.rank, fallbackIcon)}</div>
          <div className="leaderboard-name">{row.name}</div>
          <div className="leaderboard-change">{row.change ?? ""}</div>
          <div className="leaderboard-value">{row.value}</div>
        </div>
      ))}
    </div>
  );
}

function TabPanel({ tabs, activeTab, onChange }) {
  return (
    <div className="tab-switcher">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={activeTab === tab.key ? "tab-button tab-button--active" : "tab-button"}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function InsightBoard({ title, icon, rows, loading, emptyMessage, accent = "var(--sky)" }) {
  return (
    <div className="leaderboard-card">
      <div className="leaderboard-card__header">
        <h3 className="leaderboard-card__title" style={{ color: accent }}>
          <span>{icon}</span>
          {title}
        </h3>
      </div>
      {loading ? (
        <div className="leaderboard-loading">Loading RuneProfile insights…</div>
      ) : rows.length === 0 ? (
        <div className="leaderboard-loading">{emptyMessage}</div>
      ) : (
        rows.map((row, index) => (
          <div
            key={`${title}-${row.name}-${index}`}
            className={index === 0 ? "leaderboard-insight leaderboard-insight--first" : "leaderboard-insight"}
          >
            <div className="leaderboard-insight__rank">{row.rank}</div>
            <div className="leaderboard-insight__content">
              <div className="leaderboard-insight__name">{row.name}</div>
              <div className="leaderboard-insight__meta">{row.meta}</div>
            </div>
            <div className="leaderboard-insight__value">{row.value}</div>
          </div>
        ))
      )}
    </div>
  );
}

function ActivityFeed({ activities, loading }) {
  return (
    <div className="leaderboard-card" style={{ marginTop: "1.5rem" }}>
      <div className="leaderboard-card__header">
        <h3 className="leaderboard-card__title" style={{ color: "var(--purple)" }}>
          <span>🛰️</span>
          RuneProfile Highlights
        </h3>
      </div>
      {loading ? (
        <div className="leaderboard-loading">Loading RuneProfile activity…</div>
      ) : activities.length === 0 ? (
        <div className="leaderboard-loading">No recent RuneProfile activity found for the clan.</div>
      ) : (
        activities.map((activity, index) => {
          const description = describeClanActivity(activity);

          return (
            <div
              key={`${activity.account.username}-${activity.type}-${activity.createdAt}-${index}`}
              className={index === 0 ? "leaderboard-activity leaderboard-activity--first" : "leaderboard-activity"}
            >
              <div className="leaderboard-activity__icon">{description.icon}</div>
              <div className="leaderboard-activity__content">
                <div className="leaderboard-activity__title">
                  {activity.account.username}
                  <span>{description.title}</span>
                </div>
                <div className="leaderboard-activity__detail">{description.detail}</div>
              </div>
              <div className="leaderboard-activity__time">{formatRelativeTime(activity.createdAt)}</div>
            </div>
          );
        })
      )}
    </div>
  );
}

const EMPTY_SNAPSHOT = {
  groupInfo: null,
  hiscores: { overall: [], ehb: [], ehp: [] },
  gainers: { weekXP: [], weekEHB: [], monthXP: [], monthEHB: [] },
  achievements: [],
  records: [],
  clanActivities: [],
  spotlights: [],
  summary: { totalWeeklyXp: 0, biggestDrop: null, questLeader: null },
  errors: { wom: false, runeProfile: false },
};

function buildInsightRows(spotlights, sortBy, valueLabel, metaLabel) {
  return [...spotlights]
    .sort((left, right) => right[sortBy] - left[sortBy])
    .slice(0, 5)
    .map((entry, index) => ({
      rank: index + 1,
      name: entry.name,
      value: valueLabel(entry),
      meta: metaLabel(entry),
    }));
}

export default function Leaderboards() {
  const [snapshot, setSnapshot] = useState(EMPTY_SNAPSHOT);
  const [loading, setLoading] = useState(true);
  const [hiscoresTab, setHiscoresTab] = useState("overall");
  const [gainersPeriod, setGainersPeriod] = useState("week");
  const [gainersMetric, setGainersMetric] = useState("overall");

  useEffect(() => {
    let active = true;

    fetchLeaderboardSnapshot()
      .then((data) => {
        if (active) {
          setSnapshot(data);
        }
      })
      .catch(() => {
        if (active) {
          setSnapshot((current) => ({
            ...current,
            errors: { wom: true, runeProfile: true },
          }));
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const activeGainersKey =
    gainersPeriod === "week"
      ? gainersMetric === "overall"
        ? "weekXP"
        : "weekEHB"
      : gainersMetric === "overall"
        ? "monthXP"
        : "monthEHB";

  const questRaceRows = useMemo(
    () =>
      buildInsightRows(
        snapshot.spotlights,
        "questPoints",
        (entry) => `${entry.questPoints} QP`,
        (entry) => `${entry.questCompleted}/${entry.questTotal} quests complete`,
      ),
    [snapshot.spotlights],
  );

  const collectionLogRows = useMemo(
    () =>
      buildInsightRows(
        snapshot.spotlights,
        "clogRate",
        (entry) => formatPercentage(entry.clogRate),
        (entry) => `${entry.clogObtained}/${entry.clogTotal} slots logged`,
      ),
    [snapshot.spotlights],
  );

  const diaryRows = useMemo(
    () =>
      buildInsightRows(
        snapshot.spotlights,
        "diaryRate",
        (entry) => formatPercentage(entry.diaryRate),
        (entry) => `${entry.diaryCompleted}/${entry.diaryTotal} diary tasks`,
      ),
    [snapshot.spotlights],
  );

  const combatRows = useMemo(
    () =>
      buildInsightRows(
        snapshot.spotlights,
        "combatRate",
        (entry) => formatPercentage(entry.combatRate),
        (entry) => `${entry.combatCompleted}/${entry.combatTotal} CA tasks`,
      ),
    [snapshot.spotlights],
  );

  const hiscoreRows = snapshot.hiscores[hiscoresTab] ?? [];
  const gainersRows = snapshot.gainers[activeGainersKey] ?? [];

  return (
    <div className="leaderboards-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Hall of Fame</SectionBadge>
          <h1 className="hero-title">
            Clan <span>Leaderboards</span>
          </h1>
          <p className="hero-subtitle">
            Wise Old Man keeps the ladder fresh, and RuneProfile adds the deeper account facts,
            progress races, and clan moments worth checking back for.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ paddingBottom: "0" }}>
        <div className="container">
          <div className="fun-stats-strip">
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {snapshot.groupInfo ? snapshot.groupInfo.memberCount : "—"}
              </div>
              <div className="fun-stat-card__label">Active WOM Members</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {loading ? "—" : formatCompactNumber(snapshot.summary.totalWeeklyXp, " xp")}
              </div>
              <div className="fun-stat-card__label">Total XP This Week</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {snapshot.summary.biggestDrop
                  ? formatCompactNumber(snapshot.summary.biggestDrop.data.value, " gp")
                  : "—"}
              </div>
              <div className="fun-stat-card__label">Biggest Tracked Drop</div>
              <div className="fun-stat-card__meta">
                {snapshot.summary.biggestDrop
                  ? `${snapshot.summary.biggestDrop.account.username} · ${describeClanActivity(snapshot.summary.biggestDrop).title}`
                  : "Waiting on fresh RuneProfile highlights"}
              </div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {snapshot.summary.questLeader ? `${snapshot.summary.questLeader.questPoints} QP` : "—"}
              </div>
              <div className="fun-stat-card__label">Quest Cape Pace Setter</div>
              <div className="fun-stat-card__meta">
                {snapshot.summary.questLeader
                  ? `${snapshot.summary.questLeader.name} · ${snapshot.summary.questLeader.questCompleted}/${snapshot.summary.questLeader.questTotal} quests`
                  : "No RuneProfile spotlight data yet"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container narrow">
          <div className="section-header">
            <SectionBadge tone="sky">Rankings</SectionBadge>
            <h2 className="section-title">Top Clan Members</h2>
            <p className="section-subtitle">
              The live competitive ladder from Wise Old Man: total level, bossing hours, and skilling efficiency.
            </p>
          </div>

          <TabPanel
            tabs={[
              { key: "overall", label: "⚔️ Total Level" },
              { key: "ehb", label: "🐉 Boss EHB" },
              { key: "ehp", label: "🎒 Skill EHP" },
            ]}
            activeTab={hiscoresTab}
            onChange={setHiscoresTab}
          />

          <div className="leaderboard-card">
            <LeaderboardTable
              rows={hiscoreRows}
              loading={loading}
              emptyMsg={snapshot.errors.wom ? "Could not reach Wise Old Man right now." : "No hiscore data yet."}
              fallbackIcon={hiscoresTab === "ehb" ? "🐉" : hiscoresTab === "ehp" ? "🎒" : "⚔️"}
            />
          </div>
        </div>
      </section>

      <section className="page-section page-section--gradient">
        <div className="container narrow">
          <div className="section-header">
            <SectionBadge tone="teal">Gains</SectionBadge>
            <h2 className="section-title">Top Gainers</h2>
            <p className="section-subtitle">
              The weekly and monthly grinders. Flip between raw XP growth and bossing-hours progress.
            </p>
          </div>

          <div className="lboard-period-tabs">
            <TabPanel
              tabs={[
                { key: "week", label: "📅 This Week" },
                { key: "month", label: "📆 This Month" },
              ]}
              activeTab={gainersPeriod}
              onChange={setGainersPeriod}
            />
            <TabPanel
              tabs={[
                { key: "overall", label: "🎒 XP Gained" },
                { key: "ehb", label: "🐉 Boss EHB" },
              ]}
              activeTab={gainersMetric}
              onChange={setGainersMetric}
            />
          </div>

          <div className="leaderboard-card">
            <LeaderboardTable
              rows={gainersRows}
              loading={loading}
              emptyMsg={snapshot.errors.wom ? "Could not reach Wise Old Man right now." : "No gainers recorded yet for this period."}
              fallbackIcon={gainersMetric === "ehb" ? "🐉" : "🎒"}
            />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <SectionBadge tone="purple">RuneProfile</SectionBadge>
            <h2 className="section-title">Progress Spotlights</h2>
            <p className="section-subtitle">
              Deeper account facts for the same names leading the clan — the sort of progress that usually gets buried in chat.
            </p>
          </div>

          <div className="leaderboards-insights-grid">
            <InsightBoard
              title="Quest Cape Race"
              icon="📜"
              rows={questRaceRows}
              loading={loading}
              emptyMessage={snapshot.errors.runeProfile ? "RuneProfile is unavailable right now." : "Waiting for RuneProfile account snapshots."}
              accent="var(--gold)"
            />
            <InsightBoard
              title="Collection Log Hunters"
              icon="📦"
              rows={collectionLogRows}
              loading={loading}
              emptyMessage={snapshot.errors.runeProfile ? "RuneProfile is unavailable right now." : "No collection log spotlights yet."}
              accent="var(--sky)"
            />
            <InsightBoard
              title="Diary Grinders"
              icon="🗺️"
              rows={diaryRows}
              loading={loading}
              emptyMessage={snapshot.errors.runeProfile ? "RuneProfile is unavailable right now." : "No diary progress spotlights yet."}
              accent="var(--teal)"
            />
            <InsightBoard
              title="Combat Taskers"
              icon="⚔️"
              rows={combatRows}
              loading={loading}
              emptyMessage={snapshot.errors.runeProfile ? "RuneProfile is unavailable right now." : "No combat achievement spotlights yet."}
              accent="var(--purple)"
            />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <SectionBadge tone="gold">Activity</SectionBadge>
            <h2 className="section-title">Clan Activity</h2>
            <p className="section-subtitle">
              Wise Old Man tracks the leaderboard milestones, while RuneProfile surfaces the richer clan moments worth revisiting.
            </p>
          </div>

          <div className="lboard-two-col">
            <div className="leaderboard-card">
              <div className="leaderboard-card__header">
                <h3 className="leaderboard-card__title" style={{ color: "var(--gold)" }}>
                  <span>🏆</span>
                  Recent WOM Milestones
                </h3>
              </div>
              {loading ? (
                <div className="leaderboard-loading">Loading achievements…</div>
              ) : snapshot.achievements.length === 0 ? (
                <div className="leaderboard-loading">No recent achievements found.</div>
              ) : (
                snapshot.achievements.map((achievement, index) => (
                  <div key={`${achievement.player.displayName}-${achievement.createdAt}-${index}`} className="leaderboard-activity">
                    <div className="leaderboard-activity__icon">🏆</div>
                    <div className="leaderboard-activity__content">
                      <div className="leaderboard-activity__title">
                        {achievement.player.displayName}
                        <span>{achievement.name}</span>
                      </div>
                      <div className="leaderboard-activity__detail">Wise Old Man milestone</div>
                    </div>
                    <div className="leaderboard-activity__time">{formatRelativeTime(achievement.createdAt)}</div>
                  </div>
                ))
              )}
            </div>

            <div className="leaderboard-card">
              <div className="leaderboard-card__header">
                <h3 className="leaderboard-card__title" style={{ color: "var(--sky)" }}>
                  <span>📈</span>
                  Weekly Records
                </h3>
              </div>
              {loading ? (
                <div className="leaderboard-loading">Loading records…</div>
              ) : snapshot.records.length === 0 ? (
                <div className="leaderboard-loading">No records set this week.</div>
              ) : (
                snapshot.records.map((record, index) => (
                  <div key={`${record.player.displayName}-${record.metric}-${index}`} className="leaderboard-activity">
                    <div className="leaderboard-activity__icon">📈</div>
                    <div className="leaderboard-activity__content">
                      <div className="leaderboard-activity__title">
                        {record.player.displayName}
                        <span>{formatMetricName(record.metric)}</span>
                      </div>
                      <div className="leaderboard-activity__detail">Weekly record value: {formatCompactNumber(record.value)}</div>
                    </div>
                    <div className="leaderboard-activity__time">#{index + 1}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <ActivityFeed activities={snapshot.clanActivities} loading={loading} />

          <p className="leaderboard-note">
            {snapshot.errors.wom && snapshot.errors.runeProfile ? (
              "Both data providers are temporarily unavailable."
            ) : (
              <>
                Powered by{" "}
                <a href={`https://wiseoldman.net/groups/${WOM_GROUP_ID}`} target="_blank" rel="noreferrer">
                  Wise Old Man
                </a>{" "}
                for the ladder and{" "}
                <a href={RUNEPROFILE_SITE} target="_blank" rel="noreferrer">
                  RuneProfile
                </a>{" "}
                for account progress snapshots.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="page-section page-section--gradient">
        <div className="container narrow center-text">
          <SectionBadge tone="purple">Compete</SectionBadge>
          <h2 className="section-title">Want to climb the boards?</h2>
          <p className="section-subtitle">
            Sync on WOM, keep RuneProfile updated, and give the clan something worth checking in on.
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
