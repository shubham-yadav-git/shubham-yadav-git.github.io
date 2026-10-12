import Section from './Section';

const EXPERIENCE = [
  {
    title: 'SDET (Software Development Engineer in Test)',
    date: '2022 – Present',
    org: 'Tally Solutions Private Ltd., Bengaluru, Karnataka',
    points: [
      'Worked as an SDET, designing and maintaining automated test solutions with a strong focus on software quality, reliability, and regression coverage.',
      'Built reusable Python-based test automation frameworks and workflows for functional, API, and backend validation.',
      'Developed API testing and software validation workflows using tools such as Postman, Python Requests, and automated test suites.',
      'Collaborated with development teams to identify defects, improve test coverage, and strengthen release quality across software workflows.',
    ],
  },
  {
    title: 'Assistant System Engineer',
    date: '2021 – 2022',
    org: 'Tata Consultancy Services, Noida, Uttar Pradesh',
    points: [
      'Worked in a DevOps-driven environment focused on Linux administration, networking, system operations, and deployment support.',
      'Built hands-on experience with Jenkins, CI/CD pipelines, plugin configuration, and automated release processes.',
      'Supported project setup and deployment workflows involving Node.js services, PostgreSQL, Redis, and Linux-based server environments.',
      'Worked with AWS services such as EC2, Elastic Beanstalk, and CloudWatch for application deployment and monitoring.',
      'Contributed to end-to-end environment setup, including Docker configuration, Git workflows, and container-based deployments.',
    ],
  },
];

const EDUCATION = [
  {
    title: 'Bachelor of Technology & Computer Science',
    date: '2017 – 2021',
    org: 'United College of Engineering And Research, Prayagraj, UP',
    desc: 'Studied core computer science fundamentals including data structures, algorithms, operating systems, databases, and software engineering principles.',
  },
  {
    title: 'High School and Intermediate & Physics, Chemistry, Maths',
    date: '2014 – 2016',
    org: 'Umanath Singh Higher Secondary School, Jaunpur, UP',
    desc: 'Completed intermediate education with a focus on Physics, Chemistry, and Mathematics, building a strong foundation for engineering studies.',
  },
];

function Entry({ title, date, org, children }) {
  return (
    <article className="entry">
      <div className="entry__head">
        <h4 className="entry__title">{title}</h4>
        <span className="entry__date">{date}</span>
      </div>
      <p className="entry__org">{org}</p>
      {children}
    </article>
  );
}

export default function Resume() {
  return (
    <Section
      id="resume"
      num={2}
      title="Resume"
      intro="SDET focused on test automation, quality engineering, backend systems, DevOps, and cloud operations."
    >
      <h3 className="subhead">Professional Experience</h3>
      {EXPERIENCE.map((job) => (
        <Entry key={job.title} {...job}>
          <ul className="entry__list">
            {job.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </Entry>
      ))}

      <h3 className="subhead">Education</h3>
      {EDUCATION.map((ed) => (
        <Entry key={ed.title} {...ed}>
          <p className="entry__desc">{ed.desc}</p>
        </Entry>
      ))}

      <h3 className="subhead">Summary</h3>
      <p>
        Shubham Yadav · Uttar Pradesh ·{' '}
        <a href="mailto:shubhamskyjnp@gmail.com">shubhamskyjnp@gmail.com</a>
      </p>
    </Section>
  );
}
