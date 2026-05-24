import { useEffect, useMemo, useState } from "react";
import SectionBadge from "../components/SectionBadge";
import {
  describeClanActivity,
  fetchLeaderboardSnapshot,
  formatCompactNumber,
  formatRelativeTime,
} from "../utils/leaderboards";

const EMPTY_SNAPSHOT = {
  groupInfo: null,
  gainers: { weekXP: [] },
  achievements: [],
  clanActivities: [],
  summary: { totalWeeklyXp: 0, biggestDrop: null, questLeader: null },
};

function PulseCard({ title, icon, children, loading, emptyMessage = "No data yet", accent = "var(--sky)" }) {
  return (
    <div className="leaderboard-card">
      <div className="leaderboard-card__header">
        <h3 className="leaderboard-card__title" style={{ color: accent }}>
          <span>{icon}</span>
          {title}
        </h3>
      </div>
      {loading ? <div className="leaderboard-loading">Loading clan pulse…</div> : children ?? <div className="leaderboard-loading">{emptyMessage}</div>}
    </div>
  );
}

export default function Stats() {
  const [snapshot, setSnapshot] = useState(EMPTY_SNAPSHOT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchLeaderboardSnapshot()
      .then((data) => {
        if (active) {
          setSnapshot(data);
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

  const questRaceRows = useMemo(
    () =>
      [...(snapshot.spotlights ?? [])]
        .sort((left, right) => right.questPoints - left.questPoints)
        .slice(0, 5),
    [snapshot.spotlights],
  );

  return (
    <div className="stats-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Clan Pulse</SectionBadge>
          <h1 className="hero-title">
            Fresh <span>Stats</span>
          </h1>
          <p className="hero-subtitle">
            A quicker read on the clan: current XP push, juicy RuneProfile moments, and the quest cape chase.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ paddingBottom: "0" }}>
        <div className="container">
          <div className="fun-stats-strip">
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">{snapshot.groupInfo ? snapshot.groupInfo.memberCount : "—"}</div>
              <div className="fun-stat-card__label">Tracked Members</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">{loading ? "—" : formatCompactNumber(snapshot.summary.totalWeeklyXp, " xp")}</div>
              <div className="fun-stat-card__label">Weekly XP Push</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {snapshot.summary.biggestDrop ? formatCompactNumber(snapshot.summary.biggestDrop.data.value, " gp") : "—"}
              </div>
              <div className="fun-stat-card__label">Best Recent Drop</div>
            </div>
            <div className="fun-stat-card">
              <div className="fun-stat-card__value">
                {snapshot.summary.questLeader ? `${snapshot.summary.questLeader.questPoints} QP` : "—"}
              </div>
              <div className="fun-stat-card__label">Quest Cape Leader</div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="lboard-two-col">
            <PulseCard title="Weekly XP Leaders" icon="🎒" loading={loading} accent="var(--teal)">
              {snapshot.gainers.weekXP.length > 0
                ? snapshot.gainers.weekXP.slice(0, 5).map((row, index) => (
                    <div key={`${row.name}-${index}`} className={index === 0 ? "leaderboard-insight leaderboard-insight--first" : "leaderboard-insight"}>
                      <div className="leaderboard-insight__rank">{row.rank}</div>
                      <div className="leaderboard-insight__content">
                        <div className="leaderboard-insight__name">{row.name}</div>
                        <div className="leaderboard-insight__meta">Weekly XP gained</div>
                      </div>
                      <div className="leaderboard-insight__value">{row.value}</div>
                    </div>
                  ))
                : null}
            </PulseCard>

            <PulseCard title="RuneProfile Highlights" icon="🛰️" loading={loading} accent="var(--purple)">
              {snapshot.clanActivities.length > 0
                ? snapshot.clanActivities.slice(0, 6).map((activity, index) => {
                    const description = describeClanActivity(activity);

                    return (
                      <div key={`${activity.account.username}-${activity.createdAt}-${index}`} className={index === 0 ? "leaderboard-activity leaderboard-activity--first" : "leaderboard-activity"}>
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
                : null}
            </PulseCard>
          </div>
        </div>
      </section>

      <section className="page-section page-section--gradient">
        <div className="container">
          <div className="lboard-two-col">
            <PulseCard title="Recent WOM Milestones" icon="🏆" loading={loading} accent="var(--gold)">
              {snapshot.achievements.length > 0
                ? snapshot.achievements.slice(0, 6).map((achievement, index) => (
                    <div key={`${achievement.player.displayName}-${achievement.createdAt}-${index}`} className={index === 0 ? "leaderboard-activity leaderboard-activity--first" : "leaderboard-activity"}>
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
                : null}
            </PulseCard>

            <PulseCard title="Quest Cape Race" icon="📜" loading={loading} accent="var(--sky)">
              {questRaceRows.length > 0
                ? questRaceRows.map((entry, index) => (
                    <div key={`${entry.name}-${index}`} className={index === 0 ? "leaderboard-insight leaderboard-insight--first" : "leaderboard-insight"}>
                      <div className="leaderboard-insight__rank">{index + 1}</div>
                      <div className="leaderboard-insight__content">
                        <div className="leaderboard-insight__name">{entry.name}</div>
                        <div className="leaderboard-insight__meta">{entry.questCompleted}/{entry.questTotal} quests complete</div>
                      </div>
                      <div className="leaderboard-insight__value">{entry.questPoints} QP</div>
                    </div>
                  ))
                : null}
            </PulseCard>
          </div>
        </div>
      </section>
    </div>
  );
}
