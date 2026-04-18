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

const GUIDES = [
  {
    title: "Starting Out in Clickerz",
    category: "General",
    author: "Mod Click",
    date: "April 10, 2026",
    excerpt: "Everything you need to know about our clan ranks, Discord setup, and how to get involved in our weekly events.",
    emoji: "🌟",
    tone: "sky"
  },
  {
    title: "Efficiency 101: OSRS Basics",
    category: "Skilling",
    author: "SkillKing",
    date: "April 12, 2026",
    excerpt: "New to the game? Here's how to optimize your early levels and unlock the most important teleports and items quickly.",
    emoji: "🎒",
    tone: "teal"
  },
  {
    title: "Bossing for Beginners",
    category: "PvM",
    author: "BossSlayer",
    date: "April 15, 2026",
    excerpt: "Ready to move past Scurrius? We break down the easiest bosses to start your PvM journey and what gear you'll need.",
    emoji: "🐉",
    tone: "gold"
  },
  {
    title: "Wise Old Man Tracking Guide",
    category: "Meta",
    author: "TrackerMod",
    date: "April 16, 2026",
    excerpt: "How to ensure your gains are being tracked correctly on Wise Old Man so you can participate in SOTW and BOTW.",
    emoji: "📊",
    tone: "purple"
  }
];

export default function Guides() {
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
          <div className="values-grid">
            {GUIDES.map((guide, index) => (
              <article key={index} className="value-card" style={{ "--card-accent": `var(--${guide.tone})` }}>
                <div className="value-card__icon" style={{ background: `var(--border)` }}>
                  {guide.emoji}
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
                      {guide.category}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {guide.date}
                    </span>
                  </div>
                  <h3 className="value-card__title" style={{ color: `var(--${guide.tone})`, fontSize: '16px' }}>
                    {guide.title}
                  </h3>
                  <p className="value-card__desc">
                    {guide.excerpt}
                  </p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--border)', display: 'grid', placeItems: 'center', fontSize: '12px' }}>
                      👤
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-soft)' }}>
                      {guide.author}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--gradient">
        <div className="container narrow center-text">
          <SectionBadge tone="gold">Contribute</SectionBadge>
          <h2 className="section-title">Want to Write a Guide?</h2>
          <p className="section-subtitle">
            We're always looking for helpful members to share their knowledge. Reach out to a moderator on Discord to get your guide featured!
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="https://discord.gg/cju3DSSdju" target="_blank" rel="noreferrer" className="button button--secondary">
              Contact us on Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
