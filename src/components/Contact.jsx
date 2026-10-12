import './Contact.css';

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-header">
        <h2>Contact</h2>
        <p>
          Contact Shubham from Jaunpur, UP, India via email at shubhamskyjnp@gmail.com, WhatsApp
          at shubhamky, or Telegram at shubham_ky.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-item__label">Location</span>
            <span className="contact-item__value">Jaunpur, UP, India</span>
          </div>
          <div className="contact-item">
            <span className="contact-item__label">Email</span>
            <a href="mailto:shubhamskyjnp@gmail.com" className="contact-item__value">
              shubhamskyjnp@gmail.com
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-item__label">WhatsApp</span>
            <a
              href="https://wa.me/?text=Hi%20Shubham"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item__value"
            >
              shubhamky
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-item__label">Telegram</span>
            <a
              href="https://t.me/shubham_ky"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item__value"
            >
              shubham_ky
            </a>
          </div>
        </div>

        <div className="contact-map">
          <iframe
            title="Jaunpur, Uttar Pradesh location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.623767070274!2d82.59660531502188!3d25.761184583646647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39917d1569bcbf0f%3A0xad9070386b8df6af!2sPolytechnique%20Chauraha%2C%20Jaunpur%2C%20Uttar%20Pradesh%20225201!5e0!3m2!1sen!2sin!4v1646077641541!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
