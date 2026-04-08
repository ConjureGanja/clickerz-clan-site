import { useEffect, useState } from "react";

/*
 * ============================================================
 * CLICKERZ.CC — Homepage
 * ============================================================
 * QUICK EDIT GUIDE:
 *
 * 1) Update Discord / social links in SITE_LINKS
 * 2) Update weekly SOTW / BOTW in WEEKLY_EVENTS
 * 3) Update clan stats in CLAN_STATS
 * 4) Update real member names/scores in LEADERBOARD_DATA
 * ============================================================
 */

const SITE_LINKS = {
  discord: "https://discord.gg/cju3DSSdju",
  twitter: "https://x.com/YOUR_HANDLE",
  reddit: "https://reddit.com/",
  join: "https://discord.gg/cju3DSSdju",
};

const CLAN_STATS = {
  activeMembers: "50+",
  toxicityTolerance: "0",
  vibes: "∞",
};

/*
 * EASY WEEKLY UPDATE AREA
 * ------------------------------------------------------------
 * Just edit this object once per week.
 * You can toggle visibility with enabled: true / false.
 *
 * SOTW = Skill of the Week
 * BOTW = Boss of the Week
 */
const WEEKLY_EVENTS = {
  sotw: {
    enabled: true,
    title: "SOTW — Thieving",
    subtitle: "Race for the most Thieving XP this week. 25M GP pot on the line — get pickpocketing!",
    startDate: "March 31, 2026 · 8PM EST",
    endDate: "April 7, 2026 · 8PM EST",
    prize: "25,000,000 GP",
    notes: "Track via Wise Old Man. Screenshots required as backup. May the best thief win.",
    ctaLabel: "View SOTW Details",
    ctaHref: SITE_LINKS.discord,
  },
  botw: {
    enabled: false,
    title: "BOTW — Scurrius",
    subtitle: "Highest kill count by reset wins.",
    startDate: "March 13, 2026",
    endDate: "March 16, 2026",
    prize: "1st: 3M · 2nd: 2M · 3rd: 1M",
    notes: "Screenshots or Wise Old Man tracking required.",
    ctaLabel: "View BOTW Details",
    ctaHref: SITE_LINKS.discord,
  },
};

/*
 * LEADERBOARD DATA
 * ------------------------------------------------------------
 * Replace these with real member names and scores.
 * Skills: Total Level · Bosses: Kill Count
 */
const LEADERBOARD_DATA = {
  skills: [
    { rank: 1, name: "ClickMaster99", value: "2277", icon: "⚔️", change: "+12" },
    { rank: 2, name: "NoToxicVibes", value: "2180", icon: "🛡️", change: "+8" },
    { rank: 3, name: "CozyClicker", value: "2045", icon: "🎯", change: "+15" },
    { rank: 4, name: "IronGains", value: "1987", icon: "💪", change: "+22" },
    { rank: 5, name: "PeacefulPker", value: "1876", icon: "🕊️", change: "+5" },
  ],
  bosses: [
    { rank: 1, name: "ClickMaster99", value: "1,247 KC", icon: "🐉", change: "+34" },
    { rank: 2, name: "CozyClicker", value: "982 KC", icon: "🦑", change: "+18" },
    { rank: 3, name: "IronGains", value: "856 KC", icon: "👹", change: "+27" },
    { rank: 4, name: "NoToxicVibes", value: "743 KC", icon: "🗡️", change: "+11" },
    { rank: 5, name: "PeacefulPker", value: "621 KC", icon: "💀", change: "+9" },
  ],
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "values", label: "Our Values" },
  { id: "rules", label: "Code" },
  { id: "events", label: "Events" },
  { id: "leaderboards", label: "Leaderboards" },
  { id: "join", label: "Join Us" },
];

function FloatingParticle({ delay, x, size, emoji }) {
  return (
    <div
      className="floating-particle"
      style={{
        left: `${x}%`,
        bottom: "-20px",
        fontSize: `${size}px`,
        animationDuration: `${8 + delay * 2}s`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    >
      {emoji}
    </div>
  );
}

function SectionBadge({ children, tone = "sky" }) {
  const tones = {
    sky: {
      color: "#87ceeb",
      bg: "rgba(135,206,235,0.1)",
    },
    gold: {
      color: "#ffd700",
      bg: "rgba(255,215,0,0.1)",
    },
    purple: {
      color: "#7c8aff",
      bg: "rgba(124,138,255,0.1)",
    },
    teal: {
      color: "#56c8e8",
      bg: "rgba(86,200,232,0.1)",
    },
  };

  return (
    <span
      className="section-badge"
      style={{
        color: tones[tone].color,
        background: tones[tone].bg,
      }}
    >
      {children}
    </span>
  );
}

function NavBar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}
      aria-label="Primary"
    >
      <div className="container nav-inner">
        <a href="#home" className="logo">
          <img src="/logo.png" alt="Clickerz Clan Logo" className="nav-logo-img" />
          <span className="nav-logo-text">CLICKERZ<span>.CC</span></span>
        </a>

        <div className="nav-links desktop-only">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? "nav-link nav-link--active" : "nav-link"}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-button mobile-only"
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span className={mobileOpen ? "bar bar--top-open" : "bar"} />
          <span className={mobileOpen ? "bar bar--middle-open" : "bar"} />
          <span className={mobileOpen ? "bar bar--bottom-open" : "bar"} />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu mobile-only">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="mobile-menu-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const particles = [
    { emoji: "⚔️", x: 10, delay: 0, size: 20 },
    { emoji: "🛡️", x: 25, delay: 2, size: 18 },
    { emoji: "💎", x: 40, delay: 4, size: 16 },
    { emoji: "🎯", x: 55, delay: 1, size: 22 },
    { emoji: "⭐", x: 70, delay: 3, size: 14 },
    { emoji: "🏆", x: 85, delay: 5, size: 20 },
    { emoji: "✨", x: 15, delay: 6, size: 16 },
    { emoji: "🎮", x: 92, delay: 2.5, size: 18 },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />

      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      <div className="container hero-content">
        <div className="hero-logo-wrap">
          <img src="/logo.png" alt="Clickerz Clan" className="hero-logo-img" />
        </div>

        <div className="hero-badge">
          <span>🌿</span>
          <span>OSRS Clan · Est. 2026</span>
        </div>

        <h1 className="hero-title">
          Click Together.
          <br />
          <span>Grow Together.</span>
        </h1>

        <p className="hero-subtitle">
          An OSRS clan where the only thing toxic is our <strong>blowpipe specs</strong>.
          <br />
          No ego. No drama. Just gains.
        </p>

        <div className="hero-actions">
          <a
            href="#join"
            className="button button--primary"
          >
            🎮 Join the Clan
          </a>

          <a
            href="#values"
            className="button button--secondary"
          >
            Learn More ↓
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-card__value">{CLAN_STATS.activeMembers}</div>
            <div className="stat-card__label">Active Members</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{CLAN_STATS.toxicityTolerance}</div>
            <div className="stat-card__label">Tolerance for Toxicity</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{CLAN_STATS.vibes}</div>
            <div className="stat-card__label">Vibes</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div>Scroll</div>
        <div>↓</div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: "🛡️",
      title: "Zero Toxicity",
      desc: "We don't do 'sit kid.' Trash talk stays in PvP worlds. In our clan, everyone eats.",
      color: "#87ceeb",
    },
    {
      icon: "🤝",
      title: "Actually Helpful",
      desc: "Ask a 'noob question' and get a real answer, not a 'just Google it.' We all started at Tutorial Island.",
      color: "#ffd700",
    },
    {
      icon: "🎯",
      title: "All Playstyles",
      desc: "Ironman? PvMer? Skiller? Bankstander? We don't care what you click — just that you click with us.",
      color: "#87ceeb",
    },
    {
      icon: "🏆",
      title: "Growth Mindset",
      desc: "Whether you're going for your first fire cape or speed-running inferno, we celebrate every W.",
      color: "#ffd700",
    },
  ];

  return (
    <section id="values" className="page-section">
      <div className="container">
        <div className="section-header">
          <SectionBadge tone="sky">Our Values</SectionBadge>
          <h2 className="section-title">What We&apos;re About</h2>
          <p className="section-subtitle">
            Think of us as the clan hall where everyone&apos;s welcome at the table.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value) => (
            <article
              key={value.title}
              className="value-card"
              style={{ "--card-accent": value.color }}
            >
              <div
                className="value-card__icon"
                style={{ background: `${value.color}18` }}
              >
                {value.icon}
              </div>
              <div>
                <h3 className="value-card__title" style={{ color: value.color }}>
                  {value.title}
                </h3>
                <p className="value-card__desc">{value.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RulesSection() {
  const rules = [
    {
      emoji: "💬",
      text: "Be kind in CC and Discord. Banter is fine, punching down isn't.",
    },
    {
      emoji: "🚫",
      text: "No slurs, no hate speech, no exceptions. We don't care if you're joking.",
    },
    {
      emoji: "🆘",
      text: "Help when you can. Everyone's learning something. That level 40 might be your next raid buddy.",
    },
    {
      emoji: "🎭",
      text: "No scamming, no luring, no sketchy stuff. We play the game, not each other.",
    },
    {
      emoji: "📢",
      text: "If someone's being toxic, speak up or report it. We've got your back.",
    },
    {
      emoji: "🎉",
      text: "Celebrate others' achievements. A 99 is a 99, even if it's Cooking.",
    },
  ];

  return (
    <section id="rules" className="page-section page-section--gradient">
      <div className="container narrow">
        <div className="section-header">
          <SectionBadge tone="teal">The Code</SectionBadge>
          <h2 className="section-title">Our 6 Laws</h2>
          <p className="section-subtitle">Simple rules. No 400-page terms of service.</p>
        </div>

        <div className="rules-list">
          {rules.map((rule, index) => (
            <article key={index} className="rule-card">
              <div className="rule-card__number">{index + 1}</div>
              <p className="rule-card__text">
                <span className="rule-card__emoji">{rule.emoji}</span>
                {rule.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const cards = [
    {
      key: "sotw",
      icon: "🎒",
      toneClass: "event-card--sky",
      ...WEEKLY_EVENTS.sotw,
    },
    {
      key: "botw",
      icon: "🐉",
      toneClass: "event-card--gold",
      ...WEEKLY_EVENTS.botw,
    },
  ].filter((event) => event.enabled);

  return (
    <section id="events" className="page-section">
      <div className="container">
        <div className="section-header">
          <SectionBadge tone="gold">Weekly Events</SectionBadge>
          <h2 className="section-title">SOTW / BOTW</h2>
          <p className="section-subtitle">
            Compete with your fellow Clickerz for glory and GP. Check Discord for details and to submit your scores.
          </p>
        </div>

        <div className="events-grid">
          {cards.length > 0 ? (
            cards.map((event) => (
              <article key={event.key} className={`event-card ${event.toneClass}`}>
                <div className="event-card__icon">{event.icon}</div>
                <h3 className="event-card__title">{event.title}</h3>
                <p className="event-card__subtitle">{event.subtitle}</p>

                <div className="event-card__meta">
                  <div>
                    <span className="event-card__label">Start</span>
                    <strong>{event.startDate}</strong>
                  </div>
                  <div>
                    <span className="event-card__label">End</span>
                    <strong>{event.endDate}</strong>
                  </div>
                </div>

                <div className="event-card__detail">
                  <span className="event-card__label">Prize Pool</span>
                  <p className="event-card__prize">{event.prize}</p>
                </div>

                <div className="event-card__detail">
                  <span className="event-card__label">Notes</span>
                  <p>{event.notes}</p>
                </div>

                <a
                  href={event.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--secondary event-card__button"
                >
                  {event.ctaLabel}
                </a>
              </article>
            ))
          ) : (
            <div className="empty-state">
              No weekly events are active right now. Flip <code>enabled</code> to <code>true</code> in{" "}
              <code>WEEKLY_EVENTS</code> when the next event starts.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LeaderboardSection() {
  const [activeTab, setActiveTab] = useState("skills");
  const data = activeTab === "skills" ? LEADERBOARD_DATA.skills : LEADERBOARD_DATA.bosses;

  return (
    <section id="leaderboards" className="page-section page-section--gradient">
      <div className="container narrow">
        <div className="section-header">
          <SectionBadge tone="gold">Leaderboards</SectionBadge>
          <h2 className="section-title">Top Clickers</h2>
          <p className="section-subtitle">Our finest Clickerz — updated regularly.</p>
        </div>

        <div className="tab-switcher">
          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className={activeTab === "skills" ? "tab-button tab-button--active" : "tab-button"}
          >
            ⚔️ Total Level
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bosses")}
            className={activeTab === "bosses" ? "tab-button tab-button--active" : "tab-button"}
          >
            🐉 Boss KC
          </button>
        </div>

        <div className="leaderboard-card">
          {data.map((player, index) => (
            <div
              key={`${activeTab}-${player.name}`}
              className={index === 0 ? "leaderboard-row leaderboard-row--first" : "leaderboard-row"}
            >
              <div className="leaderboard-rank">{player.rank}</div>
              <div className="leaderboard-icon">{player.icon}</div>
              <div className="leaderboard-name">{player.name}</div>
              <div className="leaderboard-change">▲ {player.change}</div>
              <div className="leaderboard-value">{player.value}</div>
            </div>
          ))}
        </div>

        <p className="leaderboard-note">
          Powered by Wise Old Man · Update <code>LEADERBOARD_DATA</code> in App.jsx with real member names &amp; scores.
        </p>
      </div>
    </section>
  );
}

function DiscordSection() {
  return (
    <section className="page-section page-section--discord">
      <div className="container narrow center-text">
        <SectionBadge tone="purple">Community</SectionBadge>
        <h2 className="section-title">Come Hang Out</h2>
        <p className="section-subtitle section-subtitle--center">
          Our Discord is where the magic happens. Events, giveaways, and good vibes — all in one place.
        </p>

        <div className="discord-card">
          <div className="discord-card__icon">💬</div>
          <h3 className="discord-card__title">Clickerz Discord</h3>
          <div className="discord-card__status">
            <span className="online-dot" />
            <span>Active Now</span>
          </div>

          <div className="giveaway-banner">
            <div className="giveaway-banner__icon">🎁</div>
            <div>
              <div className="giveaway-banner__title">Giveaways Live Right Now!</div>
              <p className="giveaway-banner__text">
                We run regular giveaways as a thank-you to all our members just for being part of the clan.
                There&apos;s an active giveaway happening now — head to the <strong>#giveaways</strong> channel
                in Discord to sign up. Winner selected from all who entered!
              </p>
            </div>
          </div>

          <a
            href={SITE_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="button button--discord"
          >
            Join Discord &amp; Enter Giveaway
          </a>
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  const requirements = [
    "Any combat level",
    "Must join Discord",
    "Be respectful",
    "Have fun",
  ];

  return (
    <section id="join" className="join-section">
      <div className="join-pattern" aria-hidden="true" />
      <div className="container narrow center-text">
        <span className="join-icon" aria-hidden="true">⚔️</span>
        <h2 className="join-title">Ready to Click?</h2>
        <p className="join-subtitle">
          No application fee. No 2000 total level requirement. Just be a decent human who likes clicking things.
        </p>

        <div className="requirements-list">
          {requirements.map((item) => (
            <span key={item} className="requirement-pill">
              ✓ {item}
            </span>
          ))}
        </div>

        <a
          href={SITE_LINKS.join}
          target="_blank"
          rel="noreferrer"
          className="button button--join"
        >
          🎮 Join Clickerz
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-logo">
            CLICKERZ<span>.CC</span>
          </div>
          <p className="footer-copy">
            Click together. Grow together. © 2026
          </p>
        </div>

        <div className="footer-links">
          <a href={SITE_LINKS.discord} target="_blank" rel="noreferrer">Discord</a>
          <a href={SITE_LINKS.twitter} target="_blank" rel="noreferrer">Twitter</a>
          <a href={SITE_LINKS.reddit} target="_blank" rel="noreferrer">Reddit</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-10% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <NavBar activeSection={activeSection} />
      <HeroSection />
      <ValuesSection />
      <RulesSection />
      <EventsSection />
      <LeaderboardSection />
      <DiscordSection />
      <JoinSection />
      <Footer />
    </div>
  );
}
