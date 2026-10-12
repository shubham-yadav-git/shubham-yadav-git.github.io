const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/shubham-yadav-git' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shubham-yadav-b8568b170/' },
  { label: 'Twitter / X', href: 'https://twitter.com/shubham__yadav_' },
  { label: 'daily.dev', href: 'https://app.daily.dev/shubham_yadav' },
  { label: 'Instagram', href: 'https://instagram.com/itshubhamy' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__social">
        {SOCIAL.map(({ label, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        ))}
      </p>
      <div className="footer__meta">
        <span>© Copyright Shubham Yadav</span>
        <span className="mono">BUILD · LEARN · SHARE</span>
      </div>
    </footer>
  );
}
