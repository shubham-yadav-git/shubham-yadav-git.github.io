import Section from './Section';

const GROUPS = [
  {
    name: 'Testing & Quality',
    skills: [
      ['Test Automation / SDET', 90],
      ['Python Automation', 90],
      ['API Testing', 80],
      ['Frontend Automation', 80],
    ],
  },
  {
    name: 'Backend',
    skills: [
      ['Backend Development', 80],
      ['PostgreSQL & Redis', 70],
      ['JavaScript', 75],
    ],
  },
  {
    name: 'Infrastructure',
    skills: [
      ['Linux & System Operations', 90],
      ['Docker', 85],
      ['AWS Cloud Operations', 80],
      ['Jenkins & CI/CD', 60],
    ],
  },
];

export default function Skills() {
  return (
    <Section
      id="skills"
      num={3}
      title="Skills"
      intro="Building reliable software through Python test automation, quality engineering, API testing, backend development, DevOps practices, and cloud operations."
    >
      <div className="skills">
        {GROUPS.map((group) => (
          <div key={group.name} className="skills__group">
            <h3>{group.name}</h3>
            <ul>
              {group.skills.map(([name, pct]) => (
                <li key={name} className="leader">
                  <span>{name}</span>
                  <span className="leader__fill" aria-hidden="true" />
                  <span className="leader__val" aria-label={`${pct} percent`}>{pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
