import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { id: "/", label: "Home", exact: true },
  { id: "/events", label: "Events" },
  { id: "/leaderboards", label: "Leaderboards" },
  { id: "/guides", label: "Guides" },
  { id: "/stats", label: "Clan Stats" },
  { id: "/#join", label: "Join Us" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash links on the home page
  const handleAnchorClick = (e, id) => {
    if (id.startsWith("/#")) {
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id.substring(2));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}
      aria-label="Primary"
    >
      <div className="container nav-inner">
        <NavLink to="/" className="logo">
          <img src="/logo.svg" alt="Clickerz Clan Logo" className="nav-logo-img" />
          <span className="nav-logo-text">CLICKERZ<span>.CC</span></span>
        </NavLink>

        <div className="nav-links desktop-only">
          {NAV_LINKS.map((link) => (
            link.id.startsWith("/#") ? (
              <NavLink
                key={link.id}
                to={link.id}
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, link.id)}
              >
                {link.label}
              </NavLink>
            ) : (
              <NavLink
                key={link.id}
                to={link.id}
                className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}
                end={link.exact}
              >
                {link.label}
              </NavLink>
            )
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
            <NavLink
              key={link.id}
              to={link.id}
              className="mobile-menu-link"
              onClick={(e) => handleAnchorClick(e, link.id)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
