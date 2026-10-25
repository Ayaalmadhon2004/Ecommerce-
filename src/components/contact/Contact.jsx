import styles from "./contact.module.css";

function Contact() {
  return (
    <section className={styles.contact}>
      <h1>Contact Us</h1>
      <p>We would love to hear from you.</p>
      <ul>
        <li><i className="fa-solid fa-envelope"></i> support@exclusive.com</li>
        <li><i className="fa-solid fa-phone"></i> +1 234 567 890</li>
      </ul>
    </section>
  );
}

export default Contact;
