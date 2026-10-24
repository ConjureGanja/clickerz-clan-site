import { useEffect, useMemo, useState } from "react";
import SectionBadge from "../components/SectionBadge";
import {
  fetchSharedClickLeaderboard,
  formatClickCount,
  saveClickLeaderboardEntry,
  useClickerzScore,
} from "../utils/clickingGame";

const SOUNDCLOUD_PROFILE_URL = "https://soundcloud.com/clickerz-cc";

const FLOATING_EMOJIS = [
  { emoji: "🌿", value: 10 },
  { emoji: "✨", value: 10 },
  { emoji: "💎", value: 25 },
  { emoji: "🏆", value: 50 },
  { emoji: "💀", value: -10 },
  { emoji: "🪤", value: -10 },
  { emoji: "🔥", value: 15 },
  { emoji: "🧨", value: -25 },
];

function createFloatingEmoji() {
  const item = FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)];

  return {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    left: 12 + Math.random() * 76,
    size: 28 + Math.random() * 28,
    duration: 6 + Math.random() * 5,
  };
}

function formatLeaderboardDate(value) {
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return "—";
  return new Date(time).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ClickingGame() {
  const { score, addScore } = useClickerzScore();
  const [floaters, setFloaters] = useState(() => Array.from({ length: 7 }, createFloatingEmoji));
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lastBonus, setLastBonus] = useState(null);

  const topScore = useMemo(() => leaderboard[0]?.score ?? 0, [leaderboard]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Our Soundcloud — Clickerz.CC";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    let intervalId = null;

    const start = () => {
      if (intervalId !== null) return;
      intervalId = window.setInterval(() => {
        setFloaters((current) => [...current.slice(-11), createFloatingEmoji()]);
      }, 1050);
    };

    const stop = () => {
      if (intervalId === null) return;
      window.clearInterval(intervalId);
      intervalId = null;
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchSharedClickLeaderboard()
      .then((rows) => {
        if (!cancelled) setLeaderboard(rows);
      })
      .finally(() => {
        if (!cancelled) setLeaderboardLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleFloaterClick = (floater) => {
    addScore(floater.value);
    setFloaters((current) => current.filter((item) => item.id !== floater.id));
    setLastBonus({ id: floater.id, value: floater.value, emoji: floater.emoji });
  };

  const handleFloaterEnd = (id) => {
    setFloaters((current) => current.filter((item) => item.id !== id));
  };

  const handleSubmitScore = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitMessage("");

    if (score < 1) {
      setSubmitMessage("Click a few times before submitting a score.");
      return;
    }

    setSubmitting(true);
    try {
      const nextRows = await saveClickLeaderboardEntry(playerName, score);
      setLeaderboard(nextRows);
      setPlayerName("");
      setSubmitMessage("Score added to the shared Clickerz Clicking Game leaderboard!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setSubmitMessage(
        message === "Score must be a positive number."
          ? "Click a few times before submitting a score."
          : "Could not reach shared leaderboard. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="clicking-game-page">

      <section className="hero-section hero-section--compact clicking-game-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb--one" aria-hidden="true" />
        <div className="hero-orb hero-orb--two" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Our Soundcloud</SectionBadge>
          <h1 className="hero-title">
            Our
            <br />
            <span>Soundcloud</span>
          </h1>
          <p className="hero-subtitle">
            Every site click counts. Catch the floating emojis for bonus points, but dodge the traps.
            The clan SoundCloud starts with your first click, tap, or scroll, and you can pause or mute it from the widget.
          </p>
        </div>
      </section>

      <section className="page-section clicking-game-arena" aria-label="Our Soundcloud">
        <div className="container clicking-game-layout">
          <div className="clicking-score-card">
            <div className="clicking-score-card__label">Your clicks</div>
            <div className="clicking-score-card__score">{formatClickCount(score)}</div>
            {lastBonus && (
              <div className={lastBonus.value >= 0 ? "clicking-bonus clicking-bonus--good" : "clicking-bonus clicking-bonus--bad"}>
                {lastBonus.emoji} {lastBonus.value > 0 ? "+" : ""}{lastBonus.value}
              </div>
            )}
            <p>
              Big emojis are worth more, skulls and traps take clicks away. Submit your score to the shared clan leaderboard.
            </p>
          </div>

          <div className="clicking-side-panel">
            <div className="clicking-panel-card">
              <h2>Our Soundcloud</h2>
              <p>
                The player sits with the click counter on every page. Pause or mute it there.
                This page is for the clicking game and the shared score list.
              </p>
              <a
                className="button button--secondary"
                href={SOUNDCLOUD_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open on SoundCloud
              </a>
            </div>

            <form className="clicking-panel-card" onSubmit={handleSubmitScore}>
              <h2>Submit Score</h2>
              <label className="clicking-name-label" htmlFor="clicking-player-name">
                Display name
              </label>
              <input
                id="clicking-player-name"
                className="clicking-name-input"
                type="text"
                value={playerName}
                maxLength={24}
                placeholder="Anonymous Clicker"
                onChange={(event) => setPlayerName(event.target.value)}
              />
              <button type="submit" className="button button--join" disabled={submitting || score < 1}>
                {submitting ? "Saving score..." : "Add score to leaderboard"}
              </button>
              {submitMessage && <p className="clicking-submit-message">{submitMessage}</p>}
            </form>
          </div>
        </div>

        <div className="container clicking-leaderboard-wrap">
          <div className="section-header">
            <SectionBadge tone="sky">Separate leaderboard</SectionBadge>
            <h2 className="section-title">Click Leaders</h2>
            <p className="section-subtitle">
              Shared across visitors and separate from Wise Old Man or RuneProfile leaderboards.
            </p>
          </div>

          <div className="leaderboard-card clicking-leaderboard-card">
            {leaderboardLoading ? (
              <div className="leaderboard-loading">Loading shared clicking leaderboard...</div>
            ) : leaderboard.length === 0 ? (
              <div className="leaderboard-loading">No clicking game scores yet. Submit yours first.</div>
            ) : (
              leaderboard.slice(0, 10).map((row, index) => (
                <div
                  key={row.id}
                  className={index === 0 ? "leaderboard-row leaderboard-row--first" : "leaderboard-row"}
                >
                  <div className="leaderboard-rank">{index + 1}</div>
                  <div className="leaderboard-icon">{index === 0 ? "👑" : "🖱️"}</div>
                  <div className="leaderboard-name">{row.name}</div>
                  <div className="leaderboard-change">{formatLeaderboardDate(row.date)}</div>
                  <div className="leaderboard-value">{formatClickCount(row.score)}</div>
                </div>
              ))
            )}
          </div>
          <p className="leaderboard-note">Current top score: {formatClickCount(topScore)}</p>
        </div>

        <div className="clicking-floater-field" aria-hidden="false">
          {floaters.map((floater) => (
            <button
              key={floater.id}
              type="button"
              className={floater.value >= 0 ? "clicking-floater clicking-floater--good" : "clicking-floater clicking-floater--bad"}
              style={{
                left: `${floater.left}%`,
                fontSize: `${floater.size}px`,
                animationDuration: `${floater.duration}s`,
              }}
              aria-label={`${floater.emoji} ${floater.value > 0 ? "adds" : "removes"} ${Math.abs(floater.value)} clicks`}
              onClick={() => handleFloaterClick(floater)}
              onAnimationEnd={() => handleFloaterEnd(floater.id)}
            >
              <span>{floater.emoji}</span>
              <strong>{floater.value > 0 ? "+" : ""}{floater.value}</strong>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
