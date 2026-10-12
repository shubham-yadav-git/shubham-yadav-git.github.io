import Section from './Section';

export default function About() {
  return (
    <Section id="about" num={1} title="About">
      <h3 className="about__headline">SDET &amp; Automation Engineer.</h3>
      <p className="about__intro">
        I enjoy turning complex engineering problems into reliable solutions — from designing
        automation frameworks and validating APIs to building backend services and improving
        development workflows.
      </p>
      <p className="about__body">
        I&rsquo;m Shubham, an SDET focused on quality engineering, test automation, API
        validation, backend systems, and developer productivity — helping teams ship reliable
        software with speed and confidence.
      </p>

      <dl className="facts">
        <dt>Role</dt>
        <dd>SDET</dd>
        <dt>Degree</dt>
        <dd>Bachelor of Technology</dd>
        <dt>City</dt>
        <dd>Jaunpur, UP, India</dd>
        <dt>Email</dt>
        <dd><a href="mailto:shubhamskyjnp@gmail.com">shubhamskyjnp@gmail.com</a></dd>
        <dt>Blog</dt>
        <dd>
          <a href="https://computergeeks.hashnode.dev/" target="_blank" rel="noopener noreferrer">
            ComputerGeeks
          </a>
        </dd>
        <dt>Website</dt>
        <dd>
          <a href="https://shubhamy.in" target="_blank" rel="noopener noreferrer">shubhamy.in</a>
        </dd>
      </dl>
    </Section>
  );
}
