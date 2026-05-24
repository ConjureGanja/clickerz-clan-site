import { useEffect, useMemo, useState } from "react";
import SectionBadge from "../components/SectionBadge";
import {
  formatClickCount,
  readClickLeaderboard,
  saveClickLeaderboardEntry,
  useClickerzScore,
} from "../utils/clickingGame";
import { useAudioManager } from "../utils/audioManager";

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
    left: 6 + Math.random() * 88,
    size: 28 + Math.random() * 32,
    duration: 6 + Math.random() * 5,
  };
}

function formatLeaderboardDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ClickingGame() {
  const { score, addScore } = useClickerzScore();
  const audio = useAudioManager();
  const [floaters, setFloaters] = useState(() => Array.from({ length: 7 }, createFloatingEmoji));
  const [leaderboard, setLeaderboard] = useState(readClickLeaderboard);
  const [playerName, setPlayerName] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [lastBonus, setLastBonus] = useState(null);

  const topScore = useMemo(() => leaderboard[0]?.score ?? 0, [leaderboard]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFloaters((current) => [...current.slice(-11), createFloatingEmoji()]);
    }, 1050);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleFloaterClick = (floater) => {
    addScore(floater.value);
    setFloaters((current) => current.filter((item) => item.id !== floater.id));
    setLastBonus({ id: floater.id, value: floater.value, emoji: floater.emoji });
  };

  const handleFloaterEnd = (id) => {
    setFloaters((current) => current.filter((item) => item.id !== id));
  };

  const handleSubmitScore = (event) => {
    event.preventDefault();
    const nextRows = saveClickLeaderboardEntry(playerName, score);
    setLeaderboard(nextRows);
    setPlayerName("");
    setSubmitMessage("Score added to the Clickerz Clicking Game leaderboard!");
  };

  return (
    <div className="clicking-game-page">

      <section className="hero-section hero-section--compact clicking-game-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb--one" aria-hidden="true" />
        <div className="hero-orb hero-orb--two" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Clickerz Clicking Game</SectionBadge>
          <h1 className="hero-title">
            Clickerz
            <br />
            <span>Clicking Game</span>
          </h1>
          <p className="hero-subtitle">
            Every site click counts. Catch the floating emojis for bonus points, but dodge the traps.
          </p>
        </div>
      </section>

      <section className="page-section clicking-game-arena" aria-label="Clickerz Clicking Game arena">
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
              Big emojis are worth more, skulls and traps take clicks away. Your score is saved in this browser.
            </p>
          </div>

          <div className="clicking-side-panel">
            <div className="clicking-panel-card">
              <h2>Game Music</h2>
              <p>
                {audio.isPlaying
                  ? "Looping game music is playing."
                  : "Press Play to start the game music."}
              </p>
              <div className="clicking-music-controls">
                <button type="button" className="button button--primary" onClick={() => audio.toggle()}>
                  {audio.isPlaying ? "⏸ Pause" : "▶ Play"}
                </button>
                <button type="button" className="button button--secondary" onClick={() => audio.adjustVolume(-0.1)}>
                  Volume −
                </button>
                <button type="button" className="button button--secondary" onClick={() => audio.adjustVolume(0.1)}>
                  Volume +
                </button>
              </div>
              <div className="clicking-volume">Volume: {Math.round(audio.volume * 100)}%</div>
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
              <button type="submit" className="button button--join">
                Add score to leaderboard
              </button>
              {submitMessage && <p className="clicking-submit-message">{submitMessage}</p>}
            </form>
          </div>
        </div>

        <div className="container clicking-leaderboard-wrap">
          <div className="section-header">
            <SectionBadge tone="sky">Separate leaderboard</SectionBadge>
            <h2 className="section-title">Clickerz Clicking Game Leaders</h2>
            <p className="section-subtitle">
              This is local to the clicking game and separate from Wise Old Man or RuneProfile leaderboards.
            </p>
          </div>

          <div className="leaderboard-card clicking-leaderboard-card">
            {leaderboard.length === 0 ? (
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
