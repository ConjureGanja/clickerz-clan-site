const SITE_LINKS = {
  discord: "https://discord.gg/cju3DSSdju",
  twitter: "https://x.com/YOUR_HANDLE",
  reddit: "https://reddit.com/",
};

export default function Footer() {
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
