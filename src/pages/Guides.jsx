import { useState } from "react";
import { Link } from "react-router-dom";
import { GUIDES, GUIDE_CATEGORIES } from "../data/guides";

const TONE_COLORS = {
  sky:    "#87ceeb",
  gold:   "#ffd700",
  teal:   "#56c8e8",
  purple: "#7c8aff",
};

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

export default function Guides() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? GUIDES
    : GUIDES.filter((g) => g.category === activeCategory);

  return (
    <div className="guides-page">
      <section className="hero-section hero-section--compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <SectionBadge tone="sky">Knowledge Base</SectionBadge>
          <h1 className="hero-title">Clan <span>Guides</span></h1>
          <p className="hero-subtitle">
            Tips, tricks, and strategies from your fellow Clickerz.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="tab-switcher" style={{ marginBottom: "2.5rem" }}>
            {GUIDE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={activeCategory === cat ? "tab-button tab-button--active" : "tab-button"}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">No guides in this category yet.</div>
          ) : (
            <div className="values-grid">
              {filtered.map((guide) => (
                <article
                  key={guide.slug}
                  className="value-card"
                  style={{ "--card-accent": TONE_COLORS[guide.tone] ?? "#87ceeb" }}
                >
                  <div className="value-card__icon" style={{ background: `${TONE_COLORS[guide.tone] ?? "#87ceeb"}18` }}>
                    {guide.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-soft)", textTransform: "uppercase" }}>
                        {guide.category}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {guide.date}
                      </span>
                    </div>
                    <h3
                      className="value-card__title"
                      style={{ color: TONE_COLORS[guide.tone] ?? "var(--sky)", fontSize: "16px" }}
                    >
                      {guide.title}
                    </h3>
                    <p className="value-card__desc">{guide.excerpt}</p>
                    <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--border)", display: "grid", placeItems: "center", fontSize: "12px" }}>
                          👤
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-soft)" }}>
                          {guide.author}
                        </span>
                      </div>
                      <Link
                        to={`/guides/${guide.slug}`}
                        className="button button--secondary"
                        style={{ minHeight: "36px", padding: "0.4rem 1rem", fontSize: "13px", borderRadius: "10px" }}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-section page-section--gradient">
        <div className="container narrow center-text">
          <SectionBadge tone="gold">Contribute</SectionBadge>
          <h2 className="section-title">Want to Write a Guide?</h2>
          <p className="section-subtitle">
            We&apos;re always looking for helpful members to share their knowledge. Reach out to a moderator on Discord to get your guide featured!
          </p>
          <div style={{ marginTop: "2rem" }}>
            <a href="https://discord.gg/cju3DSSdju" target="_blank" rel="noreferrer" className="button button--secondary">
              Contact us on Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
