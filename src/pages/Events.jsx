import { useEffect, useState } from "react";

const WOM_GROUP_ID = 21596;
const WOM_BASE = "https://api.wiseoldman.net/v2";

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

function formatGained(value, isSkill) {
  if (value == null) return "0";
  const n = Number(value);
  if (isSkill) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M xp";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "k xp";
    return n.toLocaleString() + " xp";
  }
  return n.toLocaleString() + " kc";
}

function WinnerPodium({ comp, participations, isSkill }) {
  const medals = ["🥇", "🥈", "🥉"];
  const top3 = participations.slice(0, 3);

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
            <span className="podium-gained">
              {formatGained(p.progress?.gained, isSkill)}
            </span>
          </div>
        ))}
        {top3.length === 0 && (
          <div className="podium-empty">No participants recorded.</div>
        )}
      </div>

      <a
        href={`https://wiseoldman.net/competitions/${comp.id}`}
        target="_blank"
        rel="noreferrer"
        className="button button--secondary"
        style={{ width: "100%", marginTop: "1rem", fontSize: "13px" }}
      >
        Full Results on WOM
      </a>
    </div>
  );
}

export default function Events() {
  const [comps, setComps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sotwWinners, setSotwWinners] = useState(null);
  const [botwWinners, setBotwWinners] = useState(null);

  useEffect(() => {
    fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/competitions?limit=20`)
      .then((r) => r.json())
      .then((data) => {
        setComps(data);
        setLoading(false);

        const finished = data.filter((c) => c.status === "finished");
        const lastSotw = finished.find(
          (c) => WOM_SKILLS.has(c.metric) && c.metric !== "overall"
        );
        const lastBotw = finished.find((c) => !WOM_SKILLS.has(c.metric));

        const fetchWinners = async (comp, setter) => {
          if (!comp) return;
          try {
            const res = await fetch(`${WOM_BASE}/competitions/${comp.id}`);
            const detail = await res.json();
            setter({ comp, participations: detail.participations ?? [] });
          } catch {
            setter({ comp, participations: [] });
          }
        };

        fetchWinners(lastSotw, setSotwWinners);
        fetchWinners(lastBotw, setBotwWinners);
      })
      .catch(() => setLoading(false));
  }, []);

  const ongoing = comps.filter((c) => c.status === "ongoing");
  const upcoming = comps.filter((c) => c.status === "upcoming");
  const finished = comps.filter((c) => c.status === "finished").slice(0, 4);

  const renderEventCard = (comp) => {
    const isSkill = WOM_SKILLS.has(comp.metric);
    const toneClass = isSkill ? "event-card--sky" : "event-card--gold";
    const icon = isSkill ? "🎒" : "🐉";
    const typeLabel = isSkill ? "SOTW" : "BOTW";

    return (
      <article key={comp.id} className={`event-card ${toneClass}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
            <strong style={{ fontSize: "13px" }}>{formatCompDate(comp.startsAt)}</strong>
          </div>
          <div>
            <span className="event-card__label">Ends</span>
            <strong style={{ fontSize: "13px" }}>{formatCompDate(comp.endsAt)}</strong>
          </div>
        </div>

        <div className="event-card__detail">
          <span className="event-card__label">Participants</span>
          <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "14px", color: "var(--text)" }}>
            {comp.participantCount} Clickerz
          </p>
        </div>

        <a
          href={`https://wiseoldman.net/competitions/${comp.id}`}
          target="_blank"
          rel="noreferrer"
          className="button button--secondary event-card__button"
          style={{ width: "100%", marginTop: "1rem" }}
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
            Skill of the Week (SOTW) and Boss of the Week (BOTW).{" "}
            Check here for live tracking and upcoming battles.
          </p>
          <p className="reset-note">🕗 Events reset every Monday at 8 PM EST</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? (
            <div className="leaderboard-loading">Fetching events from Wise Old Man...</div>
          ) : (
            <>
              {/* Last Event Winners */}
              {(sotwWinners || botwWinners) && (
                <div style={{ marginBottom: "4rem" }}>
                  <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
                    <SectionBadge tone="gold">Previous Event</SectionBadge>
                    <h2 className="section-title" style={{ fontSize: "20px" }}>Last Week&apos;s Winners</h2>
                  </div>
                  <div className="winners-grid">
                    {sotwWinners && (
                      <WinnerPodium
                        comp={sotwWinners.comp}
                        participations={sotwWinners.participations}
                        isSkill={true}
                      />
                    )}
                    {botwWinners && (
                      <WinnerPodium
                        comp={botwWinners.comp}
                        participations={botwWinners.participations}
                        isSkill={false}
                      />
                    )}
                  </div>
                </div>
              )}

              {ongoing.length > 0 && (
                <div style={{ marginBottom: "4rem" }}>
                  <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
                    <SectionBadge tone="sky">Live Now</SectionBadge>
                    <h2 className="section-title" style={{ fontSize: "20px" }}>Ongoing Battles</h2>
                  </div>
                  <div className="events-grid">
                    {ongoing.map(renderEventCard)}
                  </div>
                </div>
              )}

              {upcoming.length > 0 && (
                <div style={{ marginBottom: "4rem" }}>
                  <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
                    <SectionBadge tone="purple">Coming Soon</SectionBadge>
                    <h2 className="section-title" style={{ fontSize: "20px" }}>Upcoming Events</h2>
                  </div>
                  <div className="events-grid">
                    {upcoming.map(renderEventCard)}
                  </div>
                </div>
              )}

              {finished.length > 0 && (
                <div>
                  <div className="section-header" style={{ textAlign: "left", marginBottom: "2rem" }}>
                    <SectionBadge tone="teal">Recent History</SectionBadge>
                    <h2 className="section-title" style={{ fontSize: "20px" }}>Past Competitions</h2>
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
          <div style={{ marginTop: "2rem" }}>
            <a href="https://discord.gg/cju3DSSdju" target="_blank" rel="noreferrer" className="button button--primary">
              Verify your RSN on Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
