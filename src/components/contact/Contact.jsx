import { useState } from "react";
import styles from "./contact.module.css";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet: acknowledge the submission and reset the form.
    setSent(true);
    setForm(EMPTY_FORM);
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Contact Us</h1>
          <p>We would love to hear from you.</p>
        </header>

        <div className={styles.grid}>
          <aside className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.icon}>
                <i className="fa-solid fa-phone"></i>
              </span>
              <div>
                <h2>Call To Us</h2>
                <p>We are available 24/7, 7 days a week.</p>
                <a href="tel:+1234567890">+1 234 567 890</a>
              </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.infoItem}>
              <span className={styles.icon}>
                <i className="fa-solid fa-envelope"></i>
              </span>
              <div>
                <h2>Write To Us</h2>
                <p>Fill out the form and we will reply within 24 hours.</p>
                <a href="mailto:support@exclusive.com">support@exclusive.com</a>
              </div>
            </div>
          </aside>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                aria-label="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                aria-label="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                aria-label="Your Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              aria-label="Your Message"
              rows="8"
              value={form.message}
              onChange={handleChange}
              required
            />

            <div className={styles.actions}>
              {sent && (
                <p className={styles.success} role="status">
                  Thanks! Your message has been sent.
                </p>
              )}
              <button type="submit" className={styles.submit}>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
