import './Skills.css';

const LEFT_SKILLS = [
  { name: 'Python Automation', pct: 90 },
  { name: 'Linux & System Operations', pct: 90 },
  { name: 'Docker', pct: 85 },
  { name: 'Jenkins & CI/CD', pct: 60 },
  { name: 'JavaScript', pct: 75 },
  { name: 'Test Automation / SDET', pct: 90 },
];

const RIGHT_SKILLS = [
  { name: 'AWS Cloud Operations', pct: 80 },
  { name: 'Backend Development', pct: 80 },
  { name: 'API Testing', pct: 80 },
  { name: 'PostgreSQL & Redis', pct: 70 },
  { name: 'Frontend Automation', pct: 80 },
  { name: 'Android App Development', pct: 70 },
];

function SkillBar({ name, pct }) {
  return (
    <div className="skill-item">
      <div className="skill-item__header">
        <span className="skill-item__name">{name}</span>
        <span className="skill-item__pct">{pct}%</span>
      </div>
      <div className="skill-item__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${name}: ${pct}%`}>
        <div className="skill-item__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-header">
        <h2>Skills</h2>
        <p>
          Building reliable software through Python test automation, quality engineering, API
          testing, backend development, DevOps practices, and cloud operations.
        </p>
      </div>

      <div className="skills-grid">
        <div className="skills-col">
          {LEFT_SKILLS.map((s) => (
            <SkillBar key={s.name} name={s.name} pct={s.pct} />
          ))}
        </div>
        <div className="skills-col">
          {RIGHT_SKILLS.map((s) => (
            <SkillBar key={s.name} name={s.name} pct={s.pct} />
          ))}
        </div>
      </div>
    </section>
  );
}
