import { Link } from "react-router-dom";
import Services from "../services/Services";
import styles from "./about.module.css";

const stats = [
  { id: 0, icon: "fa-solid fa-shop", value: "10.5k", label: "Active sellers on our site" },
  { id: 1, icon: "fa-solid fa-dollar-sign", value: "33k", label: "Monthly product sales" },
  { id: 2, icon: "fa-solid fa-bag-shopping", value: "45.5k", label: "Active customers" },
  { id: 3, icon: "fa-solid fa-sack-dollar", value: "25k", label: "Annual gross sale" },
];

function About() {
  return (
    <main className={styles.about}>
      <p className={styles.breadcrumb}>
        <Link to="/">Home</Link> / <span>About</span>
      </p>

      <section className={styles.hero}>
        <div className={styles.story}>
          <span className={styles.eyebrow}>Our story</span>
          <h1>About Exclusive</h1>
          <p>
            Exclusive is your one-stop online shop for electronics, fashion,
            home essentials and more, delivered with fast shipping and friendly
            support.
          </p>
          <p>
            We work with trusted brands to bring you quality products at fair
            prices, and we are always growing our catalogue so there is
            something for everyone.
          </p>
          <Link to="/" className={styles.cta}>
            Start shopping <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className={styles.imageWrap}>
          <img
            src="assets/photos/Side Image.png"
            alt="Shopping cart, shopping bags and a smartphone"
          />
        </div>
      </section>

      <section className={styles.stats} aria-label="Key metrics">
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.id}>
            <span className={styles.statIcon}>
              <i className={stat.icon}></i>
            </span>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      <Services />
    </main>
  );
}

export default About;
