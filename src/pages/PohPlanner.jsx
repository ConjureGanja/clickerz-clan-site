import SectionBadge from "../components/SectionBadge";
import PohPlannerApp from "../poh/PohPlannerApp";

export default function PohPlanner() {
  return (
    <div className="poh-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="gold">Group Ironman</SectionBadge>
          <h1 className="hero-title">Team <span>house</span></h1>
          <p className="hero-subtitle">
            Plan the G I Clickerz player-owned house. Drag rooms, rotate their doors, and keep the layout in this browser.
          </p>
        </div>
      </section>
      <PohPlannerApp />
    </div>
  );
}
