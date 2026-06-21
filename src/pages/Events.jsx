import { useEffect, useMemo, useState } from "react";
import { formatGained, fetchCompetitionWinners } from "../utils/wom";
import SectionBadge from "../components/SectionBadge";

const WOM_GROUP_ID = 21596;
const WOM_BASE = "https://api.wiseoldman.net/v2";

const SITE_LINKS = {
  discord: "https://discord.gg/cju3DSSdju",
  wom: `https://wiseoldman.net/groups/${WOM_GROUP_ID}`,
};

const WEEKLY_EVENTS = {
  sotw: {
    enabled: true,
    title: "SOTW — Weekly Rotation",
    subtitle: "Current SOTW updates automatically from Wise Old Man.",
    startDate: "Mondays · 8:00 PM EST",
    endDate: "Next Monday · 7:59 PM EST",
    prize: "5M GP to 1st place",
    notes: "Track your gains all week. Verify your RSN in Discord before reset.",
    ctaLabel: "View SOTW Details",
    ctaHref: SITE_LINKS.discord,
  },
  botw: {
    enabled: true,
    title: "BOTW — Weekly Rotation",
    subtitle: "Current BOTW updates automatically from Wise Old Man.",
    startDate: "Mondays · 8:00 PM EST",
    endDate: "Next Monday · 7:59 PM EST",
    prize: "5M GP to 1st place",
    notes: "Boss challenge for the week. Submit if Discord asks for proof.",
    ctaLabel: "View BOTW Details",
    ctaHref: SITE_LINKS.discord,
  },
};

const WOM_SKILLS = new Set([
  "overall",
  "attack",
  "defence",
  "strength",
  "hitpoints",
  "ranged",
  "prayer",
  "magic",
  "cooking",
  "woodcutting",
  "fletching",
  "fishing",
  "firemaking",
  "crafting",
  "smithing",
  "mining",
  "herblore",
  "agility",
  "thieving",
  "slayer",
  "farming",
  "runecrafting",
  "hunter",
  "construction",
]);

function formatMetricName(metric = "") {
  return metric
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatCompDate(isoString) {
  if (!isoString) return null;

  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function PreviousWinnersRow({ sotwWinners, botwWinners }) {
  if (!sotwWinners && !botwWinners) return null;
  const medals = ["🥇", "🥈", "🥉"];

  const renderMini = (winners, isSkill) => {
    if (!winners) return null;
    const top3 = (winners.participations ?? []).slice(0, 3);
    const comp = winners.comp;

    return (
      <div className={`winner-card ${isSkill ? "winner-card--sky" : "winner-card--gold"}`}>
        <div className="winner-card__header">
          <span className="winner-card__icon">{isSkill ? "🎒" : "🐉"}</span>
          <div>
            <div className="winner-card__type">{isSkill ? "SOTW" : "BOTW"}</div>
            <div className="winner-card__metric">{formatMetricName(comp.metric)}</div>
          </div>
          <span className="event-status event-status--finished">🏁 Finished</span>
        </div>
        <div className="podium-list">
          {top3.map((p, i) => (
            <div key={p.player?.displayName ?? i} className="podium-entry">
              <span className="podium-medal">{medals[i]}</span>
              <span className="podium-player">{p.player?.displayName ?? "—"}</span>
              <span className="podium-gained">{formatGained(p.progress?.gained, isSkill)}</span>
            </div>
          ))}
          {top3.length === 0 && <div className="podium-empty">No data yet.</div>}
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <div className="section-header" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0, fontFamily: '"Press Start 2P", monospace', fontSize: "14px", color: "var(--text-muted)" }}>
          Last Week's Champions
        </h3>
      </div>
      <div className="winners-grid">
        {renderMini(sotwWinners, true)}
        {renderMini(botwWinners, false)}
      </div>
    </div>
  );
}

export default function Events() {
  const [womComps, setWomComps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sotwWinners, setSotwWinners] = useState(null);
  const [botwWinners, setBotwWinners] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/competitions?limit=20`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;

        const safeData = Array.isArray(data) ? data : [];
        setWomComps(safeData);
        setLoading(false);

        const finished = safeData
          .filter((c) => c.status === "finished")
          .sort(
            (a, b) =>
              new Date(b.endsAt ?? b.startsAt ?? 0).getTime() -
              new Date(a.endsAt ?? a.startsAt ?? 0).getTime(),
          );

        const lastSotw = finished.find((c) => WOM_SKILLS.has(c.metric));
        const lastBotw = finished.find((c) => !WOM_SKILLS.has(c.metric));

        if (lastSotw) fetchCompetitionWinners(lastSotw).then((value) => !cancelled && setSotwWinners(value));
        if (lastBotw) fetchCompetitionWinners(lastBotw).then((value) => !cancelled && setBotwWinners(value));
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    const nextCards = [];
    const statusPriority = {
      ongoing: 0,
      upcoming: 1,
    };

    const getPreferredCompetition = (predicate) => {
      return womComps
        .filter(predicate)
        .sort((a, b) => {
          const priorityA = statusPriority[a.status] ?? 2;
          const priorityB = statusPriority[b.status] ?? 2;
          const statusDiff = priorityA - priorityB;

          if (statusDiff !== 0) return statusDiff;

          const timestampA = new Date(a.endsAt ?? a.startsAt ?? 0).getTime();
          const timestampB = new Date(b.endsAt ?? b.startsAt ?? 0).getTime();

          return priorityA === 2 ? timestampB - timestampA : timestampA - timestampB;
        })[0];
    };

    const sotwComp = getPreferredCompetition((c) => WOM_SKILLS.has(c.metric));
    const botwComp = getPreferredCompetition((c) => !WOM_SKILLS.has(c.metric));

    if (sotwComp) {
      nextCards.push({
        key: "sotw",
        icon: "🎒",
        toneClass: "event-card--sky",
        title: sotwComp.title || `SOTW — ${formatMetricName(sotwComp.metric)}`,
        subtitle: `${sotwComp.participantCount} participants competing for the most ${formatMetricName(sotwComp.metric)} XP this week.`,
        startDate: formatCompDate(sotwComp.startsAt),
        endDate: formatCompDate(sotwComp.endsAt),
        prize: WEEKLY_EVENTS.sotw.prize,
        notes: WEEKLY_EVENTS.sotw.notes,
        ctaLabel: "View on Wise Old Man",
        ctaHref: `https://wiseoldman.net/competitions/${sotwComp.id}`,
        status: sotwComp.status,
      });
    } else if (WEEKLY_EVENTS.sotw.enabled) {
      nextCards.push({
        key: "sotw",
        icon: "🎒",
        toneClass: "event-card--sky",
        title: WEEKLY_EVENTS.sotw.title,
        subtitle: WEEKLY_EVENTS.sotw.subtitle,
        startDate: WEEKLY_EVENTS.sotw.startDate,
        endDate: WEEKLY_EVENTS.sotw.endDate,
        prize: WEEKLY_EVENTS.sotw.prize,
        notes: WEEKLY_EVENTS.sotw.notes,
        ctaLabel: WEEKLY_EVENTS.sotw.ctaLabel,
        ctaHref: WEEKLY_EVENTS.sotw.ctaHref,
        status: null,
      });
    }

    if (botwComp) {
      nextCards.push({
        key: "botw",
        icon: "🐉",
        toneClass: "event-card--gold",
        title: botwComp.title || `BOTW — ${formatMetricName(botwComp.metric)}`,
        subtitle: `${botwComp.participantCount} participants competing for the highest ${formatMetricName(botwComp.metric)} count this week.`,
        startDate: formatCompDate(botwComp.startsAt),
        endDate: formatCompDate(botwComp.endsAt),
        prize: WEEKLY_EVENTS.botw.prize,
        notes: WEEKLY_EVENTS.botw.notes,
        ctaLabel: "View on Wise Old Man",
        ctaHref: `https://wiseoldman.net/competitions/${botwComp.id}`,
        status: botwComp.status,
      });
    } else if (WEEKLY_EVENTS.botw.enabled) {
      nextCards.push({
        key: "botw",
        icon: "🐉",
        toneClass: "event-card--gold",
        title: WEEKLY_EVENTS.botw.title,
        subtitle: WEEKLY_EVENTS.botw.subtitle,
        startDate: WEEKLY_EVENTS.botw.startDate,
        endDate: WEEKLY_EVENTS.botw.endDate,
        prize: WEEKLY_EVENTS.botw.prize,
        notes: WEEKLY_EVENTS.botw.notes,
        ctaLabel: WEEKLY_EVENTS.botw.ctaLabel,
        ctaHref: WEEKLY_EVENTS.botw.ctaHref,
        status: null,
      });
    }

    return nextCards;
  }, [womComps]);

  return (
    <div className="events-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Clan Competitions</SectionBadge>
          <h1 className="hero-title">
            Clan <span>Events</span>
          </h1>
          <p className="hero-subtitle">
            Skill of the Week (SOTW) and Boss of the Week (BOTW). Current event cards mirror the homepage event feed.
          </p>
          <p className="reset-note">🕗 Events reset every Monday at 8 PM EST</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <SectionBadge tone="gold">Weekly Events</SectionBadge>
            <h2 className="section-title">SOTW / BOTW</h2>
            <p className="section-subtitle">
              Compete with your fellow Clickerz for glory and GP. Check Discord for details and to submit your scores.
            </p>
            <p className="reset-note">🕗 Events reset every Monday at 8 PM EST</p>
          </div>

          {loading ? (
            <div className="leaderboard-loading">Fetching events from Wise Old Man...</div>
          ) : (
            <>
              <div className="events-grid">
                {cards.length > 0 ? (
                  cards.map((event) => (
                    <article key={event.key} className={`event-card ${event.toneClass}`}>
                      <div className="event-card__icon">{event.icon}</div>
                      {event.status && (
                        <span className={`event-status event-status--${event.status}`}>
                          {event.status === "ongoing" ? "🟢 Live" : "🕐 Upcoming"}
                        </span>
                      )}
                      <h3 className="event-card__title">{event.title}</h3>
                      <p className="event-card__subtitle">{event.subtitle}</p>

                      <div className="event-card__meta">
                        <div>
                          <span className="event-card__label">Start</span>
                          <strong>{event.startDate ?? "TBD"}</strong>
                        </div>
                        <div>
                          <span className="event-card__label">End</span>
                          <strong>{event.endDate ?? "TBD"}</strong>
                        </div>
                      </div>

                      <div className="event-card__detail">
                        <span className="event-card__label">Prize</span>
                        <p className="event-card__prize">{event.prize}</p>
                      </div>

                      <div className="event-card__detail">
                        <span className="event-card__label">Notes</span>
                        <p>{event.notes}</p>
                      </div>

                      <a
                        href={event.ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        className="button button--secondary event-card__button"
                      >
                        {event.ctaLabel}
                      </a>
                    </article>
                  ))
                ) : (
                  <div className="empty-state">
                    No weekly events active right now. Events auto-fill from{" "}
                    <a href={SITE_LINKS.wom} target="_blank" rel="noreferrer">
                      Wise Old Man
                    </a>{" "}
                    when a competition is live.
                  </div>
                )}
              </div>

              <PreviousWinnersRow sotwWinners={sotwWinners} botwWinners={botwWinners} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
