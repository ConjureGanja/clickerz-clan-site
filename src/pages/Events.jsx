import { useEffect, useState } from "react";

const WOM_GROUP_ID = 21596;

const WOM_SKILLS = new Set([
  "overall", "attack", "defence", "strength", "hitpoints", "ranged",
  "prayer", "magic", "cooking", "woodcutting", "fletching", "fishing",
  "firemaking", "crafting", "smithing", "mining", "herblore", "agility",
  "thieving", "slayer", "farming", "runecrafting", "hunter", "construction",
]);

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

function formatMetricName(metric) {
  return metric
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatCompDate(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Events() {
  const [comps, setComps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.wiseoldman.net/v2/groups/${WOM_GROUP_ID}/competitions`)
      .then((r) => r.json())
      .then((data) => {
        setComps(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const ongoing = comps.filter(c => c.status === "ongoing");
  const upcoming = comps.filter(c => c.status === "upcoming");
  const finished = comps.filter(c => c.status === "finished").slice(0, 4);

  const renderEventCard = (comp) => {
    const isSkill = WOM_SKILLS.has(comp.metric);
    const toneClass = isSkill ? "event-card--sky" : "event-card--gold";
    const icon = isSkill ? "🎒" : "🐉";
    const typeLabel = isSkill ? "SOTW" : "BOTW";

    return (
      <article key={comp.id} className={`event-card ${toneClass}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="event-card__icon">{icon}</div>
          <span className={`event-status event-status--${comp.status}`}>
            {comp.status === "ongoing" ? "🟢 Live" : comp.status === "upcoming" ? "🕐 Upcoming" : "🏁 Finished"}
          </span>
        </div>
        
        <h3 className="event-card__title">
          {typeLabel} — {formatMetricName(comp.metric)}
        </h3>
        <p className="event-card__subtitle">
          {comp.title || `${comp.participantCount} participants competing for glory.`}
        </p>

        <div className="event-card__meta">
          <div>
            <span className="event-card__label">Starts</span>
            <strong style={{ fontSize: '13px' }}>{formatCompDate(comp.startsAt)}</strong>
          </div>
          <div>
            <span className="event-card__label">Ends</span>
            <strong style={{ fontSize: '13px' }}>{formatCompDate(comp.endsAt)}</strong>
          </div>
        </div>

        <div className="event-card__detail">
          <span className="event-card__label">Participants</span>
          <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '14px', color: 'var(--text)' }}>
            {comp.participantCount} Clickerz
          </p>
        </div>

        <a
          href={`https://wiseoldman.net/competitions/${comp.id}`}
          target="_blank"
          rel="noreferrer"
          className="button button--secondary event-card__button"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          View Rankings
        </a>
      </article>
    );
  };

  return (
    <div className="events-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Clan Competitions</SectionBadge>
          <h1 className="hero-title">Clan <span>Events</span></h1>
          <p className="hero-subtitle">
            Skill of the Week (SOTW) and Boss of the Week (BOTW). 
            Check here for live tracking and upcoming battles.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? (
            <div className="leaderboard-loading">Fetching events from Wise Old Man...</div>
          ) : (
            <>
              {ongoing.length > 0 && (
                <div style={{ marginBottom: '4rem' }}>
                  <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <SectionBadge tone="sky">Live Now</SectionBadge>
                    <h2 className="section-title" style={{ fontSize: '20px' }}>Ongoing Battles</h2>
                  </div>
                  <div className="events-grid">
                    {ongoing.map(renderEventCard)}
                  </div>
                </div>
              )}

              {upcoming.length > 0 && (
                <div style={{ marginBottom: '4rem' }}>
                  <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <SectionBadge tone="purple">Coming Soon</SectionBadge>
                    <h2 className="section-title" style={{ fontSize: '20px' }}>Upcoming Events</h2>
                  </div>
                  <div className="events-grid">
                    {upcoming.map(renderEventCard)}
                  </div>
                </div>
              )}

              {finished.length > 0 && (
                <div>
                  <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <SectionBadge tone="teal">Recent History</SectionBadge>
                    <h2 className="section-title" style={{ fontSize: '20px' }}>Past Competitions</h2>
                  </div>
                  <div className="events-grid">
                    {finished.map(renderEventCard)}
                  </div>
                </div>
              )}

              {ongoing.length === 0 && upcoming.length === 0 && !loading && (
                <div className="empty-state">
                  No active or upcoming competitions found on Wise Old Man. 
                  Check back soon or head to Discord to suggest the next one!
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="page-section page-section--gradient">
        <div className="container narrow center-text">
          <SectionBadge tone="purple">Participation</SectionBadge>
          <h2 className="section-title">How to Enter</h2>
          <p className="section-subtitle">
            Participation is automatic for all clan members tracked on Wise Old Man. 
            Just make sure your RSN is updated in our Discord!
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="https://discord.gg/cju3DSSdju" target="_blank" rel="noreferrer" className="button button--primary">
              Verify your RSN on Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
