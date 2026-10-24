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
    setDisplayScore(score + pendingScoreRef.current);
  }, [score]);

  useEffect(() => {
    let flushTimeoutId = null;

    const flushPendingScore = () => {
      if (pendingScoreRef.current <= 0) return;
      const pendingScore = pendingScoreRef.current;
      pendingScoreRef.current = 0;
      addScore(pendingScore);
    };

    const scheduleFlush = () => {
      if (flushTimeoutId !== null) return;
      flushTimeoutId = window.setTimeout(() => {
        flushTimeoutId = null;
        flushPendingScore();
      }, 200);
    };

    const handleDocumentClick = (event) => {
      if (event.button !== 0) return;
      pendingScoreRef.current += 1;
      setDisplayScore((value) => value + 1);
      scheduleFlush();
    };

    const handlePageHide = () => {
      if (flushTimeoutId !== null) {
        window.clearTimeout(flushTimeoutId);
        flushTimeoutId = null;
      }
      flushPendingScore();
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("pagehide", handlePageHide);
      if (flushTimeoutId !== null) window.clearTimeout(flushTimeoutId);
      flushPendingScore();
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
