import { Link, useParams } from "react-router-dom";
import { GUIDES } from "../data/guides";

const TONE_COLORS = {
  sky:    "#87ceeb",
  gold:   "#ffd700",
  teal:   "#56c8e8",
  purple: "#7c8aff",
};

export default function GuidePost() {
  const { slug } = useParams();
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="guide-post-page">
        <section className="hero-section hero-section--compact">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-content">
            <h1 className="hero-title">Guide Not Found</h1>
            <p className="hero-subtitle">This guide doesn&apos;t exist yet.</p>
            <div style={{ marginTop: "2rem" }}>
              <Link to="/guides" className="button button--secondary">
                ← Back to Guides
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const accentColor = TONE_COLORS[guide.tone] ?? TONE_COLORS.sky;

  return (
    <div className="guide-post-page">
      <section className="hero-section hero-section--compact" style={{ position: "relative" }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <div style={{ marginBottom: "1.5rem" }}>
            <Link to="/guides" className="breadcrumb-link">
              ← Back to Guides
            </Link>
          </div>

          <span
            className="section-badge"
            style={{
              color: accentColor,
              background: `${accentColor}18`,
              marginBottom: "1rem",
            }}
          >
            {guide.category}
          </span>

          <div className="guide-post-emoji" aria-hidden="true">{guide.emoji}</div>

          <h1 className="hero-title" style={{ maxWidth: "800px", margin: "0.75rem auto 0" }}>
            {guide.title}
          </h1>

          <div className="guide-post-byline">
            <span>👤 {guide.author}</span>
            <span className="guide-post-byline__sep">·</span>
            <span>{guide.date}</span>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <article className="guide-article">
            <p className="guide-article__excerpt">{guide.excerpt}</p>
            <div className="guide-article__divider" style={{ background: accentColor }} />
            <div className="guide-article__content">
              {guide.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="guide-post-footer">
            <Link to="/guides" className="button button--secondary">
              ← Browse All Guides
            </Link>
            <a
              href="https://discord.gg/cju3DSSdju"
              target="_blank"
              rel="noreferrer"
              className="button button--primary"
            >
              💬 Discuss in Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
