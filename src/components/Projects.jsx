import './Projects.css';

const PROJECTS = [
  {
    name: 'WallApp',
    description:
      'Wallpaper curation web app and Android application — a considered collection of wallpapers for the everyday screen.',
    links: [
      { label: 'wallapp.shubhamy.in ↗', href: 'https://wallapp.shubhamy.in' },
      {
        label: 'Play Store ↗',
        href: 'https://play.google.com/store/apps/details?id=com.sky.wallapp',
      },
    ],
  },
  {
    name: 'NeatPDF',
    description:
      'Android business application for managing and working with PDF documents efficiently on mobile devices.',
    links: [
      {
        label: 'Play Store ↗',
        href: 'https://play.google.com/store/apps/details?id=com.neatpdf.android',
      },
    ],
  },
  {
    name: 'Sky ToDo',
    description:
      'Android productivity app for task management and personal organisation, built for simplicity and daily use.',
    links: [
      {
        label: 'Play Store ↗',
        href: 'https://play.google.com/store/apps/details?id=com.sky.todo',
      },
    ],
  },
  {
    name: 'ComputerGeeks Blog',
    description:
      'Technical writing covering backend architectures, Python automation, Docker, system operations, and modern software engineering.',
    links: [
      { label: 'computergeeks.hashnode.dev ↗', href: 'https://computergeeks.hashnode.dev/' },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-header">
        <h2>Projects</h2>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <div key={project.name} className="project-card">
            <h3 className="project-card__name">{project.name}</h3>
            <p className="project-card__desc">{project.description}</p>
            <div className="project-card__links">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
