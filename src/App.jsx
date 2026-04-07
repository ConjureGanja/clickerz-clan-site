<<<<<<< HEAD
// ============================================================
// App.jsx — Clickerz CC Landing Page
//
// Structure:
//   1. CLAN CONFIGURATION (edit content here)
//   2. Navbar component
//   3. Hero section
//   4. About section
//   5. Weekly Events section (SOOTW + BOTW)
//   6. Recruitment / Join section
//   7. Footer
//   8. App root (add new sections here as the site grows)
//
// Search for "TODO:" in this file to find every spot that
// needs your personal info, links, or periodic updates.
// ============================================================

import { useState, useEffect } from 'react';
import './App.css';


// ============================================================
// SECTION 1: CLAN CONFIGURATION
//
// This is the single source of truth for all clan info shown
// across the landing page. Update these values instead of
// hunting for text scattered across components.
// ============================================================

/**
 * Core clan identity and links.
 * TODO: Replace every '#' URL with your real links.
 */
const CLAN_INFO = {
  name: 'Clickerz',
  tagline: 'Click. Grind. Chill.',
  subtitle: 'A non-toxic OSRS community for every kind of adventurer.',

  // Displayed in the About section — edit this freely.
  description:
    "We're Clickerz — a laid-back Old School RuneScape clan built on good vibes " +
    "and genuine community. Whether you've been playing since the beta or just " +
    "made your first account, you'll find a welcoming home here. No elitism, " +
    "no drama, no gatekeeping. Just grinding, bossing, and hanging out together.",

  // ---- Links ----
  // discordUrl is REQUIRED — Discord CTAs are always rendered across the page.
  // TODO: Replace this with your actual Discord invite link before publishing.
  //       e.g. 'https://discord.gg/your-invite-code'
  discordUrl: 'https://discord.gg/your-invite-code',
  // Optional links below — set to null to hide their related buttons/footer entries.
  // TODO: Replace with your clan application form/thread, or set to null to hide the button
  applyUrl: null,
  // TODO: Set your official OSRS clan forum thread URL, or null to hide
  runeScapeForumUrl: null,
  // TODO: Add social links or leave as null to hide them in the footer
  twitterUrl: null,   // e.g. 'https://twitter.com/ClickerzCC'
  youtubeUrl: null,   // e.g. 'https://youtube.com/@ClickerzCC'
  twitchUrl: null,    // e.g. 'https://twitch.tv/ClickerzCC'
  redditUrl: null,    // e.g. 'https://reddit.com/r/ClickerzCC'

  // ---- Stats shown in the Hero section ----
  // TODO: Update these numbers periodically as the clan grows
  stats: {
    members: '50+',       // Approximate active member count
    founded: '2024',      // Year the clan was founded
    eventsPerWeek: '2+',  // How many events you run per week
  },
};


/**
 * Weekly rotating events — SOOTW and BOTW.
 *
 * TODO: Update 'current' for each event every week to reflect
 *       the current skill/boss. You can also update 'prize'
 *       weekly if prizes change. Everything else is static.
 */
const WEEKLY_EVENTS = [
  {
    id: 'sootw',
    acronym: 'SOOTW',
    fullName: 'Skill of the Week',
    icon: '⛏️',
    // TODO: Change this every Monday (or whenever your week resets)
    current: 'Fishing',
    description:
      'Train the featured skill alongside your clanmates all week long! ' +
      'Compete for most XP gained during the event window. Every level ' +
      'and playstyle is welcome — it\'s about the grind, not the goal.',
    howToParticipate:
      'Check your XP at the start of the week, train the skill, then ' +
      'post your total gains in the Discord event channel before the deadline!',
    // TODO: Update prize each week, or set to null to hide the prize line
    prize: 'Clan Points + Bragging Rights',
  },
  {
    id: 'botw',
    acronym: 'BOTW',
    fullName: 'Boss of the Week',
    icon: '🗡️',
    // TODO: Change this every Monday (or whenever your week resets)
    current: 'Giant Mole',
    description:
      'Stack up kill counts on the featured boss! Whether you\'re going ' +
      'solo or joining a clan mass trip, every kill counts. Group trips ' +
      'are coordinated in Discord — come for the KC, stay for the splits.',
    howToParticipate:
      'Note your KC at the start of the week, grind the boss, and post ' +
      'your final KC in the Discord event channel before the deadline!',
    // TODO: Update prize each week, or set to null to hide the prize line
    prize: 'Clan Points + Loot Splits on Mass Trips',
  },
];


/**
 * Special / upcoming big events.
 *
 * TODO: Add new events here as they're announced.
 *       Change status to 'Registration Open' or 'Active' when live.
 *       Remove events (or set status to 'Completed') when done.
 *
 * Status options : 'Coming Soon' | 'Registration Open' | 'Active' | 'Completed'
 * statusColor    : 'gold' | 'green' | 'blue' | 'grey'
 */
const SPECIAL_EVENTS = [
  {
    id: 'bingo',
    name: 'Clan Bingo',
    status: 'Coming Soon',
    statusColor: 'gold',
    icon: '🎯',
    description:
      'A community-wide bingo event with a custom board full of OSRS tasks. ' +
      'Team up with clanmates, complete squares, and unlock bonus tiles — ' +
      'compete for a prize pool while having a blast doing it.',
    // TODO: Set a real date once scheduled, e.g. 'April 2025' or 'Q2 2025'
    date: null,
    // TODO: Update prize pool once finalized
    prizePool: 'TBD',
  },
  // ---- Add more events below as they're planned ----
  // {
  //   id: 'pk-tourney',
  //   name: 'PvP Tournament',
  //   status: 'Coming Soon',
  //   statusColor: 'gold',
  //   icon: '⚔️',
  //   description: 'A friendly in-clan PvP bracket to see who reigns supreme in the wilderness.',
  //   date: null,
  //   prizePool: 'TBD',
  // },
  // {
  //   id: 'diary-race',
  //   name: 'Achievement Diary Race',
  //   status: 'Coming Soon',
  //   statusColor: 'gold',
  //   icon: '📜',
  //   description: 'Race to complete a set of achievement diaries first. Prizes for podium finishers.',
  //   date: null,
  //   prizePool: 'TBD',
  // },
];


/**
 * Recruitment configuration.
 *
 * TODO: Set isRecruiting to false if you close recruitment.
 *       Update requirements and perks as the clan evolves.
 *       Add/remove openRoles based on what you currently need.
 */
const RECRUITMENT = {
  // Set to false to show a "not currently recruiting" message instead
  isRecruiting: true,

  // What you look for in new members
  // TODO: Add, remove, or edit items to match your actual requirements
  requirements: [
    { icon: '🕊️', text: 'Good vibes only — zero toxicity, zero drama' },
    { icon: '💬', text: 'Active in clan chat and/or Discord (even casually)' },
    { icon: '📅', text: 'Willing to participate in at least some events' },
    { icon: '🎮', text: 'Any combat or total level — all stages of the game welcome' },
    // { icon: '🏆', text: '500+ total level preferred' },  // Uncomment if you add a req
  ],

  // What members get by joining
  // TODO: Add perks as they develop (clan bank, group bossing trips, etc.)
  perks: [
    { icon: '🎉', text: 'Weekly SOOTW & BOTW events with prizes' },
    { icon: '🎯', text: 'Clan Bingo and bigger events coming soon' },
    { icon: '👥', text: 'Helpful community for quests, bossing & skilling' },
    { icon: '😌', text: '100% drama-free, non-toxic environment' },
    { icon: '🤝', text: 'Always someone to play with — never grind alone' },
    // { icon: '💰', text: 'Clan bank for new members' },  // Uncomment when applicable
  ],

  // Specific roles you're actively hiring for
  // Set open: false when a position is filled
  // TODO: Update this list when positions open or close
  openRoles: [
    {
      title: 'Recruiter',
      icon: '📣',
      open: true,
      description:
        'Help grow the clan by welcoming new players, answering questions ' +
        'in CC and Discord, and being a living example of the Clickerz vibe.',
      // TODO: List any specific requirements or expectations for this role
      requirements: ['Friendly and approachable', 'Active in CC / Discord', 'Good knowledge of OSRS basics'],
    },
    // ---- Add more open roles below ----
    // {
    //   title: 'Event Coordinator',
    //   icon: '📋',
    //   open: false,
    //   description: 'Help plan, organize, and run weekly and monthly events.',
    //   requirements: ['Reliable and organized', 'Good communication skills'],
    // },
    // {
    //   title: 'Discord Moderator',
    //   icon: '🛡️',
    //   open: false,
    //   description: 'Keep the Discord chill and drama-free. Enforce rules fairly.',
    //   requirements: ['Calm under pressure', 'Active on Discord daily'],
    // },
  ],

  // Steps shown in the "How to Apply" section
  // TODO: Update channel names to match your actual Discord setup
  applySteps: [
    {
      number: '1',
      title: 'Join Our Discord',
      body: 'Hop into the Discord server and browse the info channels to get a feel for the clan.',
    },
    {
      number: '2',
      title: 'Introduce Yourself',
      // TODO: Change '#introductions' to whatever your channel is actually named
      body: 'Drop an intro in #introductions with your RSN and a bit about yourself.',
    },
    {
      number: '3',
      title: 'Get Invited In-Game',
      body: 'A recruiter or leader will reach out and send you a clan invite in-game. Easy!',
    },
  ],
};


/**
 * Clan staff / leadership list.
 * Shown in the footer or wherever you decide to display it.
 *
 * TODO: Replace placeholder entries with your actual staff.
 *       Add more objects to the array as the team grows.
 */
const STAFF = [
  // TODO: Fill these in with real RSNs and roles
  { rsn: 'YourRSN',   role: 'Clan Leader' },
  // { rsn: 'CoLeaderRSN', role: 'Co-Leader' },
  // { rsn: 'RecruiterRSN', role: 'Recruiter' },
];


// ============================================================
// SECTION 2: NAVBAR
//
// Sticky top navigation bar. Becomes more opaque on scroll.
// Mobile: collapses into a hamburger menu.
//
// TODO: Add more nav links to navLinks[] as new sections are added.
// ============================================================

function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  // Add 'scrolled' class once the user scrolls past 30px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when clicking any link
  const closeMenu = () => setMenuOpen(false);

  // TODO: Add { label: 'Rules', href: '#rules' } etc. as you add sections
  const navLinks = [
    { label: 'Home',    href: '#home' },
    { label: 'About',   href: '#about' },
    { label: 'Events',  href: '#events' },
    { label: 'Join Us', href: '#join' },
  ];
=======
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
 * 4) Replace mock leaderboard data later with Wise Old Man API
 * ============================================================
 */
>>>>>>> c62340ff14bb993719c23f45ba5687fae2846dd2

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
    enabled: false,
    title: "SOTW — Agility",
    subtitle: "Race for the most Agility XP this week.",
    startDate: "March 9, 2026",
    endDate: "March 15, 2026",
    prize: "1st: 5M · 2nd: 2M · 3rd: 1M",
    notes: "Bonus flex points if you survive rooftop brain rot.",
    ctaLabel: "View SOTW Details",
    ctaHref: SITE_LINKS.discord,
  },
  botw: {
    enabled: true,
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
<<<<<<< HEAD
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Main navigation">
      <div className="navbar__inner">

        {/* Brand / Logo */}
        <a href="#home" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-icon" aria-hidden="true">⚔️</span>
          <span className="navbar__brand-name">{CLAN_INFO.name}</span>
          <span className="navbar__brand-suffix">CC</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="navbar__link">{link.label}</a>
            </li>
          ))}
          <li>
            <a
              href={CLAN_INFO.discordUrl}
              className="navbar__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord
            </a>
          </li>
        </ul>

        {/* Hamburger (mobile only) */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile dropdown.
          inert removes hidden links from the tab order so keyboard users can't
          accidentally focus invisible items (aria-hidden alone doesn't do this). */}
      <div
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? '' : undefined}
      >
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a
          href={CLAN_INFO.discordUrl}
          className="navbar__mobile-cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          Join Discord
        </a>
      </div>
    </nav>
  );
}


// ============================================================
// SECTION 3: HERO
//
// First thing visitors see. Full-viewport, big impact.
// Stats, tagline, and two CTAs (Discord + Apply).
// ============================================================

function HeroSection() {
  return (
    <section id="home" className="hero" aria-label="Hero">
      {/* Decorative background overlay — styled in App.css */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-overlay" />
        <div className="hero__bg-grid" />
      </div>

      <div className="hero__content">
        {/* Eyebrow badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          Old School RuneScape Clan
        </div>

        {/* Clan name */}
        <h1 className="hero__title">
          <span className="hero__title-main">{CLAN_INFO.name}</span>
          <span className="hero__title-cc" aria-label="Clan Chat">CC</span>
        </h1>

        <p className="hero__tagline">{CLAN_INFO.tagline}</p>
        <p className="hero__subtitle">{CLAN_INFO.subtitle}</p>

        {/* Quick stats bar */}
        <div className="hero__stats" role="list" aria-label="Clan stats">
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-value">{CLAN_INFO.stats.members}</span>
            <span className="hero__stat-label">Members</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-value">{CLAN_INFO.stats.founded}</span>
            <span className="hero__stat-label">Founded</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-value">{CLAN_INFO.stats.eventsPerWeek}</span>
            <span className="hero__stat-label">Events / Week</span>
          </div>
        </div>

        {/* Call-to-action buttons */}
        <div className="hero__actions">
          <a
            href={CLAN_INFO.discordUrl}
            className="btn btn--primary btn--large"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Our Discord
          </a>
          <a href="#join" className="btn btn--outline btn--large">
            Learn More
          </a>
        </div>

        {/* Scroll hint */}
        <a href="#about" className="hero__scroll" aria-label="Scroll down to learn more">
          <span className="hero__scroll-text">Scroll to explore</span>
          <span className="hero__scroll-arrow" aria-hidden="true">↓</span>
=======
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

function SectionBadge({ children, tone = "blue" }) {
  const tones = {
    blue: {
      color: "#2563EB",
      bg: "rgba(59,130,246,0.08)",
    },
    teal: {
      color: "#06B6D4",
      bg: "rgba(6,182,212,0.08)",
    },
    gold: {
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.08)",
    },
    purple: {
      color: "#5865F2",
      bg: "rgba(88,101,242,0.08)",
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
          CLICKERZ<span>.CC</span>
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
        <div className="hero-badge">
          <span>🌿</span>
          <span>OSRS Clan · Est. 2025</span>
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
      color: "#2563EB",
    },
    {
      icon: "🤝",
      title: "Actually Helpful",
      desc: "Ask a 'noob question' and get a real answer, not a 'just Google it.' We all started at Tutorial Island.",
      color: "#06B6D4",
    },
    {
      icon: "🎯",
      title: "All Playstyles",
      desc: "Ironman? PvMer? Skiller? Bankstander? We don't care what you click — just that you click with us.",
      color: "#8B5CF6",
    },
    {
      icon: "🏆",
      title: "Growth Mindset",
      desc: "Whether you're going for your first fire cape or speed-running inferno, we celebrate every W.",
      color: "#F59E0B",
    },
  ];

  return (
    <section id="values" className="page-section">
      <div className="container">
        <div className="section-header">
          <SectionBadge tone="blue">Our Values</SectionBadge>
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
                style={{ background: `${value.color}10` }}
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
      icon: "📈",
      toneClass: "event-card--blue",
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
            These are intentionally easy to update. Edit one object at the top of App.jsx and you&apos;re done.
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
                  <span className="event-card__label">Prizes</span>
                  <p>{event.prize}</p>
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
    <section id="leaderboards" className="page-section">
      <div className="container narrow">
        <div className="section-header">
          <SectionBadge tone="gold">Leaderboards</SectionBadge>
          <h2 className="section-title">Top Clickers</h2>
          <p className="section-subtitle">Powered by Wise Old Man · Updated live later</p>
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
          Mock data for now — swap this with live Wise Old Man data later.
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
          Our Discord is where the magic happens. Drop in, say hi, and see what we&apos;re about before you commit.
        </p>

        <div className="discord-card">
          <div className="discord-card__icon">💬</div>
          <h3 className="discord-card__title">Clickerz Discord</h3>
          <div className="discord-card__status">
            <span className="online-dot" />
            <span>12 Online Now</span>
          </div>
          <p className="discord-card__text">
            Replace this later with a real Discord widget or keep it as a clean join card.
          </p>
          <a
            href={SITE_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="button button--discord"
          >
            Join Discord
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
>>>>>>> c62340ff14bb993719c23f45ba5687fae2846dd2
        </a>
      </div>
    </section>
  );
}

<<<<<<< HEAD

// ============================================================
// SECTION 4: ABOUT
//
// Communicates the clan's identity and values.
// TODO: Edit the 'values' array below if the clan's focus shifts.
// ============================================================

function AboutSection() {
  // TODO: Add, remove, or reword values to reflect who you are
  const values = [
    {
      icon: '🕊️',
      title: 'Non-Toxic',
      body: 'Zero drama, zero elitism. Respect is the only rule that matters here.',
    },
    {
      icon: '🤝',
      title: 'Community First',
      body: "Whether it's a quest, a grind session, or just chatting — we do it together.",
    },
    {
      icon: '🎮',
      title: 'All Levels Welcome',
      body: "Brand new account or maxed veteran — there's a spot for everyone in Clickerz.",
    },
    {
      icon: '📅',
      title: 'Active Events',
      body: "Weekly SOOTW, BOTW, and bigger events keep the clan alive and the grind fun.",
    },
  ];

  return (
    <section id="about" className="section about" aria-label="About Clickerz">
      <div className="container">

        <div className="section__header">
          <span className="section__eyebrow">Who We Are</span>
          <h2 className="section__title">Built for the Everyday Adventurer</h2>
          <p className="section__lead">{CLAN_INFO.description}</p>
        </div>

        {/* Values grid */}
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-card__icon" aria-hidden="true">{v.icon}</div>
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__body">{v.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


// ============================================================
// SECTION 5: WEEKLY EVENTS
//
// Shows SOOTW, BOTW, and any upcoming special events.
// Update WEEKLY_EVENTS and SPECIAL_EVENTS config above weekly.
// ============================================================

function EventsSection() {
  // Map statusColor strings to CSS modifier classes
  const statusClass = (color) => `special-event__status--${color}`;

  return (
    <section id="events" className="section events" aria-label="Clan events">
      <div className="container">

        <div className="section__header">
          <span className="section__eyebrow">Every Week</span>
          <h2 className="section__title">Clan Events</h2>
          <p className="section__lead">
            Two recurring events keep the clan active and give everyone a reason to log in.
            All events are opt-in — participate as much or as little as you like.
          </p>
        </div>

        {/* SOOTW + BOTW cards */}
        <div className="weekly-events-grid">
          {WEEKLY_EVENTS.map(event => (
            <article key={event.id} className="weekly-event-card" aria-label={event.fullName}>

              <div className="weekly-event-card__header">
                <span className="weekly-event-card__icon" aria-hidden="true">{event.icon}</span>
                <div>
                  <div className="weekly-event-card__acronym">{event.acronym}</div>
                  <div className="weekly-event-card__fullname">{event.fullName}</div>
                </div>
              </div>

              {/* Current week highlight */}
              <div className="weekly-event-card__current">
                <span className="weekly-event-card__current-label">This Week:</span>
                <span className="weekly-event-card__current-value">{event.current}</span>
              </div>

              <p className="weekly-event-card__description">{event.description}</p>

              <div className="weekly-event-card__meta">
                <div className="weekly-event-card__meta-row">
                  <span className="weekly-event-card__meta-label">How to join:</span>
                  <span className="weekly-event-card__meta-value">{event.howToParticipate}</span>
                </div>
                {event.prize && (
                  <div className="weekly-event-card__meta-row">
                    <span className="weekly-event-card__meta-label">Prize:</span>
                    <span className="weekly-event-card__meta-value">{event.prize}</span>
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>

        {/* Special / upcoming events */}
        {SPECIAL_EVENTS.length > 0 && (
          <div className="special-events">
            <h3 className="special-events__heading">Upcoming Special Events</h3>
            <div className="special-events-grid">
              {SPECIAL_EVENTS.map(event => (
                <article key={event.id} className="special-event-card" aria-label={event.name}>

                  <div className="special-event__top">
                    <span className="special-event__icon" aria-hidden="true">{event.icon}</span>
                    <span className={`special-event__status ${statusClass(event.statusColor)}`}>
                      {event.status}
                    </span>
                  </div>

                  <h4 className="special-event__name">{event.name}</h4>
                  <p className="special-event__description">{event.description}</p>

                  <div className="special-event__footer">
                    {event.date    && <span className="special-event__meta">📅 {event.date}</span>}
                    {event.prizePool && <span className="special-event__meta">🏆 Prize Pool: {event.prizePool}</span>}
                  </div>

                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}


// ============================================================
// SECTION 6: RECRUITMENT / JOIN
//
// Where interested players go to learn how to apply.
// Driven entirely by the RECRUITMENT config object above.
// ============================================================

function JoinSection() {
  const openRoles = RECRUITMENT.openRoles.filter(r => r.open);

  // If not recruiting, show a minimal closed message
  if (!RECRUITMENT.isRecruiting) {
    return (
      <section id="join" className="section join" aria-label="Join Clickerz">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Join Clickerz</h2>
            <p className="section__lead">
              We're not actively recruiting right now, but keep an eye on our
              Discord for when spots open up!
            </p>
            <a
              href={CLAN_INFO.discordUrl}
              className="btn btn--primary btn--large"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord to Stay Updated
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="join" className="section join" aria-label="Join Clickerz">
      <div className="container">

        <div className="section__header">
          <span className="section__eyebrow">We're Recruiting</span>
          <h2 className="section__title">Join Clickerz</h2>
          <p className="section__lead">
            Think you'd fit in? Here's what we're looking for — and what you'll
            get out of it.
          </p>
        </div>

        {/* Requirements + Perks side by side */}
        <div className="join-grid">

          <div className="join-card">
            <h3 className="join-card__title">What We Look For</h3>
            <ul className="join-list" role="list">
              {RECRUITMENT.requirements.map((req, i) => (
                <li key={i} className="join-list__item">
                  <span className="join-list__icon" aria-hidden="true">{req.icon}</span>
                  <span>{req.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="join-card join-card--highlight">
            <h3 className="join-card__title">What You Get</h3>
            <ul className="join-list" role="list">
              {RECRUITMENT.perks.map((perk, i) => (
                <li key={i} className="join-list__item">
                  <span className="join-list__icon" aria-hidden="true">{perk.icon}</span>
                  <span>{perk.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Open positions */}
        {openRoles.length > 0 && (
          <div className="open-roles">
            <h3 className="open-roles__heading">Open Positions</h3>
            <p className="open-roles__subheading">
              Beyond regular membership, we're actively looking for people to fill these roles:
            </p>
            <div className="open-roles-grid">
              {openRoles.map((role, i) => (
                <div key={i} className="role-card">
                  <div className="role-card__header">
                    <span className="role-card__icon" aria-hidden="true">{role.icon}</span>
                    <div>
                      <span className="role-card__badge">Open</span>
                      <h4 className="role-card__title">{role.title}</h4>
                    </div>
                  </div>
                  <p className="role-card__description">{role.description}</p>
                  {role.requirements?.length > 0 && (
                    <ul className="role-card__reqs" role="list">
                      {role.requirements.map((r, j) => (
                        <li key={j} className="role-card__req-item">
                          <span aria-hidden="true">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to apply steps */}
        <div className="how-to-apply">
          <h3 className="how-to-apply__heading">How to Apply</h3>
          <div className="apply-steps">
            {RECRUITMENT.applySteps.map((step, i) => (
              <div key={i} className="apply-steps__item">
                {/* Arrow between steps (not after last one) */}
                {i > 0 && <div className="apply-steps__arrow" aria-hidden="true">→</div>}
                <div className="apply-step">
                  <div className="apply-step__number" aria-hidden="true">{step.number}</div>
                  <div className="apply-step__content">
                    <h4 className="apply-step__title">{step.title}</h4>
                    <p className="apply-step__body">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTAs */}
          <div className="how-to-apply__ctas">
            <a
              href={CLAN_INFO.discordUrl}
              className="btn btn--primary btn--large"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Our Discord
            </a>
            {CLAN_INFO.applyUrl && (
              <a
                href={CLAN_INFO.applyUrl}
                className="btn btn--outline btn--large"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Online
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}


// ============================================================
// SECTION 7: FOOTER
//
// Site footer with brand, nav links, and social links.
// Social icons are shown/hidden based on whether the URL
// is set (non-null) in CLAN_INFO above.
//
// TODO: Add more footer link columns as the site grows
//       (e.g. Rules, Hall of Fame, Media).
// ============================================================

function Footer() {
  const year = new Date().getFullYear();

  // Build social links list — only include non-null URLs
  const socials = [
    { label: 'Discord',  href: CLAN_INFO.discordUrl,        icon: '💬' },
    { label: 'Twitter',  href: CLAN_INFO.twitterUrl,        icon: '🐦' },
    { label: 'YouTube',  href: CLAN_INFO.youtubeUrl,        icon: '▶️' },
    { label: 'Twitch',   href: CLAN_INFO.twitchUrl,         icon: '🎥' },
    { label: 'Reddit',   href: CLAN_INFO.redditUrl,         icon: '🤖' },
    { label: 'RS Forums',href: CLAN_INFO.runeScapeForumUrl, icon: '📜' },
  ].filter(s => s.href);

  // TODO: Add columns here as new pages are created
  const footerLinks = [
    { label: 'Home',    href: '#home' },
    { label: 'About',   href: '#about' },
    { label: 'Events',  href: '#events' },
    { label: 'Join Us', href: '#join' },
  ];

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">

        <div className="footer__main">

          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__brand-name">
              <span aria-hidden="true">⚔️</span>
              {CLAN_INFO.name} CC
            </div>
            <p className="footer__brand-tagline">{CLAN_INFO.tagline}</p>
            {/* TODO: Add a short clan motto or extra text here if desired */}
          </div>

          {/* Navigation column */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Navigation</h4>
            <ul className="footer__links" role="list">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / social column */}
          {socials.length > 0 && (
            <div className="footer__col">
              <h4 className="footer__col-heading">Connect</h4>
              <ul className="footer__links" role="list">
                {socials.map(s => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <span aria-hidden="true">{s.icon}</span> {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Staff column — only renders if STAFF array is populated */}
          {STAFF.filter(s => s.rsn !== 'YourRSN').length > 0 && (
            <div className="footer__col">
              <h4 className="footer__col-heading">Leadership</h4>
              <ul className="footer__links" role="list">
                {STAFF.filter(member => member.rsn !== 'YourRSN').map((member, i) => (
                  <li key={i}>
                    <span className="footer__staff-rsn">{member.rsn}</span>
                    <span className="footer__staff-role"> — {member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__disclaimer">
            Clickerz CC is a fan clan. Old School RuneScape is a trademark of Jagex Ltd.
            We are not affiliated with or endorsed by Jagex.
          </p>
          <p className="footer__copyright">
            © {year} Clickerz CC. All rights reserved.
            {/* TODO: Add a link to a /rules or /privacy page once created */}
          </p>
        </div>

=======
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
>>>>>>> c62340ff14bb993719c23f45ba5687fae2846dd2
      </div>
    </footer>
  );
}

<<<<<<< HEAD

// ============================================================
// SECTION 8: APP ROOT
//
// Composes all sections into the full landing page.
//
// TODO: As the site grows, add new section components here,
// for example:
//   <HallOfFameSection />   — top performers leaderboard
//   <RulesSection />        — clan rules / code of conduct
//   <MediaSection />        — screenshots, clips, highlights
//   <MembersSection />      — full member roster
// ============================================================

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <JoinSection />
        {/* TODO: Add more sections above the Footer as needed */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
=======
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
>>>>>>> c62340ff14bb993719c23f45ba5687fae2846dd2
