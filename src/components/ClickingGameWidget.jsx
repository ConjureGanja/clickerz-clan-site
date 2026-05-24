import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatClickCount, useClickerzScore } from "../utils/clickingGame";
import { useAudioManager } from "../utils/audioManager";

export default function ClickingGameWidget() {
  const { score, addScore } = useClickerzScore();
  const audio = useAudioManager();
  const location = useLocation();
  const isGamePage = location.pathname === "/clicking-game";
  const pendingScoreRef = useRef(0);
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    setDisplayScore(score);
  }, [score]);

  useEffect(() => {
    let flushTimeoutId = null;
    let idleCallbackId = null;

    const flushPendingScore = () => {
      if (pendingScoreRef.current <= 0) return;
      const pendingScore = pendingScoreRef.current;
      pendingScoreRef.current = 0;
      addScore(pendingScore);
    };

    const scheduleFlush = () => {
      if (typeof window.requestIdleCallback === "function") {
        if (idleCallbackId !== null) return;
        idleCallbackId = window.requestIdleCallback(() => {
          idleCallbackId = null;
          flushPendingScore();
        });
        return;
      }
      if (flushTimeoutId !== null) return;
      flushTimeoutId = window.setTimeout(() => {
        flushTimeoutId = null;
        flushPendingScore();
      }, 250);
    };

    const handleDocumentClick = () => {
      pendingScoreRef.current += 1;
      setDisplayScore((value) => value + 1);
      scheduleFlush();
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      flushPendingScore();
      if (flushTimeoutId !== null) window.clearTimeout(flushTimeoutId);
      if (idleCallbackId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
  }, [addScore]);

  return (
    <aside className="clicker-widget" aria-label="Clickerz Clicking Game score widget">
      <div className="clicker-widget__label">Clickerz Game</div>
      <div className="clicker-widget__score">{formatClickCount(displayScore)}</div>
      <Link className="clicker-widget__link" to="/clicking-game">
        {isGamePage ? "Keep clicking" : "Open game"}
      </Link>

      <hr className="clicker-widget__divider" />

      <div className="clicker-widget__music-label">🎵 Music</div>
      <div className="clicker-widget__music-row">
        <button
          type="button"
          className="clicker-widget__btn"
          onClick={() => audio.toggle()}
          aria-label={audio.isPlaying ? "Pause music" : "Play music"}
        >
          {audio.isPlaying ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          className="clicker-widget__btn"
          onClick={() => audio.adjustVolume(-0.1)}
          aria-label="Volume down"
        >
          −
        </button>
        <span className="clicker-widget__vol">{Math.round(audio.volume * 100)}%</span>
        <button
          type="button"
          className="clicker-widget__btn"
          onClick={() => audio.adjustVolume(0.1)}
          aria-label="Volume up"
        >
          +
        </button>
      </div>
    </aside>
  );
}
