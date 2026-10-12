import './Resume.css';

export default function Resume() {
  return (
    <section id="resume">
      <div className="section-header">
        <h2>Resume</h2>
        <p>
          SDET focused on test automation, quality engineering, backend systems, DevOps, and cloud
          operations.
        </p>
      </div>

      <div className="resume-layout">
        {/* LEFT COLUMN */}
        <div className="resume-col">
          <h3 className="resume-subtitle">Summary</h3>
          <div className="resume-timeline">
            <div className="resume-item">
              <div className="resume-item__dot" />
              <div className="resume-item__body">
                <p className="resume-item__name">Shubham Yadav</p>
                <p className="resume-item__meta">Uttar Pradesh</p>
                <p className="resume-item__meta">
                  <a href="mailto:shubhamskyjnp@gmail.com">shubhamskyjnp@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          <h3 className="resume-subtitle">Education</h3>
          <div className="resume-timeline">
            <div className="resume-item">
              <div className="resume-item__dot" />
              <div className="resume-item__body">
                <p className="resume-item__title">Bachelor of Technology &amp; Computer Science</p>
                <p className="resume-item__date">2017 – 2021</p>
                <p className="resume-item__org">
                  United College of Engineering And Research, Prayagraj, UP
                </p>
                <p className="resume-item__desc">
                  Studied core computer science fundamentals including data structures, algorithms,
                  operating systems, databases, and software engineering principles.
                </p>
              </div>
            </div>
            <div className="resume-item">
              <div className="resume-item__dot" />
              <div className="resume-item__body">
                <p className="resume-item__title">
                  High School and Intermediate &amp; Physics, Chemistry, Maths
                </p>
                <p className="resume-item__date">2014 – 2016</p>
                <p className="resume-item__org">
                  Umanath Singh Higher Secondary School, Jaunpur, UP
                </p>
                <p className="resume-item__desc">
                  Completed intermediate education with a focus on Physics, Chemistry, and
                  Mathematics, building a strong foundation for engineering studies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="resume-col">
          <h3 className="resume-subtitle">Professional Experience</h3>
          <div className="resume-timeline">
            <div className="resume-item">
              <div className="resume-item__dot" />
              <div className="resume-item__body">
                <p className="resume-item__title">Assistant System Engineer</p>
                <p className="resume-item__date">2021 – 2022</p>
                <p className="resume-item__org">
                  Tata Consultancy Services, Noida, Uttar Pradesh
                </p>
                <ul className="resume-item__list">
                  <li>
                    Worked in a DevOps-driven environment focused on Linux administration,
                    networking, system operations, and deployment support.
                  </li>
                  <li>
                    Built hands-on experience with Jenkins, CI/CD pipelines, plugin configuration,
                    and automated release processes.
                  </li>
                  <li>
                    Supported project setup and deployment workflows involving Node.js services,
                    PostgreSQL, Redis, and Linux-based server environments.
                  </li>
                  <li>
                    Worked with AWS services such as EC2, Elastic Beanstalk, and CloudWatch for
                    application deployment and monitoring.
                  </li>
                  <li>
                    Contributed to end-to-end environment setup, including Docker configuration,
                    Git workflows, and container-based deployments.
                  </li>
                </ul>
              </div>
            </div>
            <div className="resume-item">
              <div className="resume-item__dot" />
              <div className="resume-item__body">
                <p className="resume-item__title">
                  SDET (Software Development Engineer in Test)
                </p>
                <p className="resume-item__date">2022 – Present</p>
                <p className="resume-item__org">
                  Tally Solutions Private Ltd., Bengaluru, Karnataka
                </p>
                <ul className="resume-item__list">
                  <li>
                    Worked as an SDET, designing and maintaining automated test solutions with a
                    strong focus on software quality, reliability, and regression coverage.
                  </li>
                  <li>
                    Built reusable Python-based test automation frameworks and workflows for
                    functional, API, and backend validation.
                  </li>
                  <li>
                    Developed API testing and software validation workflows using tools such as
                    Postman, Python Requests, and automated test suites.
                  </li>
                  <li>
                    Collaborated with development teams to identify defects, improve test coverage,
                    and strengthen release quality across software workflows.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
