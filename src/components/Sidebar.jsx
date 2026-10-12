import './Sidebar.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const DailyDevIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M1.094 12L6 4.5h5L6 12l5 7.5H6zm7 0L13 4.5h5L13 12l5 7.5h-5z" />
  </svg>
);

const GooglePlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.18 23.76c.27.14.58.19.91.1l11.94-6.9-2.59-2.59zM.5 1.5C.19 1.83 0 2.32 0 2.95v18.1c0 .63.19 1.12.5 1.45l.07.07 10.14-10.14v-.24L.57 1.43zM19.37 9.93l-2.9-1.68-2.88 2.88 2.88 2.88 2.91-1.68c.83-.48.83-1.92-.01-2.4zM4.1.24L16.04 7.14l-2.59 2.59L4.1.37z" />
  </svg>
);

export default function Sidebar({ activeSection, isMobileOpen, setIsMobileOpen }) {
  const handleNavClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="hamburger"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileOpen}
      >
        <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? 'sidebar--open' : ''}`}>
        {/* Name block */}
        <div className="sidebar-name">
          <a href="#hero" className="sidebar-name__link" onClick={handleNavClick}>
            <span className="sidebar-name__text">Shubham Yadav</span>
          </a>
          <p className="sidebar-name__tagline">BUILD · LEARN · SHARE</p>
        </div>

        {/* Social links */}
        <div className="sidebar-social">
          <a
            href="https://twitter.com/shubham__yadav_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="sidebar-social__link"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://app.daily.dev/shubham_yadav"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="daily.dev"
            className="sidebar-social__link"
          >
            <DailyDevIcon />
          </a>
          <a
            href="https://instagram.com/itshubhamy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="sidebar-social__link"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://github.com/shubham-yadav-git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="sidebar-social__link"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-yadav-b8568b170/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="sidebar-social__link"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://play.google.com/store/search?q=pub%3Ashubhamy&c=apps&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Play"
            className="sidebar-social__link"
          >
            <GooglePlayIcon />
          </a>
        </div>

        {/* Nav links */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`sidebar-nav__link ${activeSection === id ? 'sidebar-nav__link--active' : ''}`}
              onClick={handleNavClick}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
