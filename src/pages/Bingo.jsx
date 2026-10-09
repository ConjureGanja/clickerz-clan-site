import SectionBadge from "../components/SectionBadge";
import BingoApp from "../bingo/BingoApp";

// Page wrapper: the shared hero on top, the bingo tool below — same shape as the POH planner page.
export default function Bingo() {
  return (
    <div className="bingo-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Clan Event</SectionBadge>
          <h1 className="hero-title">Clan <span>bingo</span></h1>
          <p className="hero-subtitle">
            Track the clan bingo card, build your own from 78 tasks, and share it with a link.
          </p>
        </div>
      </section>
      <BingoApp />
    </div>
  );
}
