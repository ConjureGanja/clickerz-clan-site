import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatClickCount, useClickerzScore } from "../utils/clickingGame";

export default function ClickingGameWidget() {
  const { score, addScore } = useClickerzScore();
  const location = useLocation();
  const isGamePage = location.pathname === "/clicking-game";

  useEffect(() => {
    const handleDocumentClick = () => addScore(1);

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [addScore]);

  return (
    <aside className="clicker-widget" aria-label="Clickerz Clicking Game score widget">
      <div className="clicker-widget__label">Clickerz Game</div>
      <div className="clicker-widget__score">{formatClickCount(score)}</div>
      <Link className="clicker-widget__link" to="/clicking-game">
        {isGamePage ? "Keep clicking" : "Open game"}
      </Link>
    </aside>
  );
}
