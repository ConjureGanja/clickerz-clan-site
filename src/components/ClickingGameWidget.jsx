import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatClickCount, useClickerzScore } from "../utils/clickingGame";

export default function ClickingGameWidget() {
  const { score, addScore } = useClickerzScore();
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
    </aside>
  );
}
