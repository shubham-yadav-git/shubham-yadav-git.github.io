const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Masthead() {
  return (
    <header id="hero" className="masthead">
      <p className="masthead__role">SDET · Software Development Engineer in Test</p>
      <h1 className="masthead__name">Shubham Yadav</h1>
      <p className="masthead__lede">
        I build <em>reliable test automation</em>, <em>robust testing frameworks</em>, and{' '}
        <em>better developer workflows</em>.
      </p>
      <p className="masthead__cta">
        <a href="#about">Explore my work</a>
        <a href="#contact">Let&rsquo;s talk</a>
      </p>
      <nav className="masthead__nav" aria-label="Main navigation">
        {NAV_LINKS.map(({ id, label }) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
