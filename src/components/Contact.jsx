import Section from './Section';

export default function Contact() {
  return (
    <Section
      id="contact"
      num={5}
      title="Contact"
      intro="Contact Shubham from Jaunpur, UP, India via email at shubhamskyjnp@gmail.com, WhatsApp at shubhamky, or Telegram at shubham_ky."
    >
      <dl className="facts">
        <dt>Location</dt>
        <dd>Jaunpur, UP, India</dd>
        <dt>Email</dt>
        <dd><a href="mailto:shubhamskyjnp@gmail.com">shubhamskyjnp@gmail.com</a></dd>
        <dt>WhatsApp</dt>
        <dd>
          <a href="https://wa.me/?text=Hi%20Shubham" target="_blank" rel="noopener noreferrer">
            shubhamky
          </a>
        </dd>
        <dt>Telegram</dt>
        <dd>
          <a href="https://t.me/shubham_ky" target="_blank" rel="noopener noreferrer">
            shubham_ky
          </a>
        </dd>
      </dl>

      <div className="contact__map">
        <iframe
          title="Jaunpur, Uttar Pradesh location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.623767070274!2d82.59660531502188!3d25.761184583646647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39917d1569bcbf0f%3A0xad9070386b8df6af!2sPolytechnique%20Chauraha%2C%20Jaunpur%2C%20Uttar%20Pradesh%20225201!5e0!3m2!1sen!2sin!4v1646077641541!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
