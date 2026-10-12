import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="section-header">
        <h2>About</h2>
      </div>

      <div className="about-layout">
        <div className="about-main">
          <h3 className="about-headline">SDET &amp; Automation Engineer.</h3>
          <p className="about-intro">
            <em>
              I enjoy turning complex engineering problems into reliable solutions — from designing
              automation frameworks and validating APIs to building backend services and improving
              development workflows.
            </em>
          </p>

          <div className="about-info-grid">
            <div className="about-info-item">
              <span className="about-info-label">Role</span>
              <span className="about-info-value">SDET</span>
            </div>
            <div className="about-info-item">
              <span className="about-info-label">Blog</span>
              <span className="about-info-value">
                <a href="https://computergeeks.hashnode.dev/" target="_blank" rel="noopener noreferrer">
                  ComputerGeeks
                </a>
              </span>
            </div>
            <div className="about-info-item">
              <span className="about-info-label">City</span>
              <span className="about-info-value">Jaunpur, UP, India</span>
            </div>
            <div className="about-info-item">
              <span className="about-info-label">Degree</span>
              <span className="about-info-value">Bachelor of Technology</span>
            </div>
            <div className="about-info-item">
              <span className="about-info-label">Email</span>
              <span className="about-info-value">
                <a href="mailto:shubhamskyjnp@gmail.com">shubhamskyjnp@gmail.com</a>
              </span>
            </div>
            <div className="about-info-item">
              <span className="about-info-label">Website</span>
              <span className="about-info-value">
                <a href="https://shubhamy.in" target="_blank" rel="noopener noreferrer">
                  shubhamy.in
                </a>
              </span>
            </div>
          </div>

          <p className="about-body">
            I&rsquo;m Shubham, an SDET focused on quality engineering, test automation, API
            validation, backend systems, and developer productivity — helping teams ship reliable
            software with speed and confidence.
          </p>

          <div className="about-wallapp">
            <span className="about-wallapp-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </span>
            <span>
              <a href="https://wallapp.shubhamy.in" target="_blank" rel="noopener noreferrer">
                WallApp ↗
              </a>
              {' '}— Wallpaper curation web app &amp;{' '}
              <a
                href="https://play.google.com/store/apps/details?id=com.sky.wallapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Android app ↗
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
