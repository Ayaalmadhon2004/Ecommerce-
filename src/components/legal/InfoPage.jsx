import styles from "./infoPage.module.css";

export default function InfoPage({ title, paragraphs = [] }) {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      {paragraphs.map((text, i) => (
        <p key={i} className={styles.text}>{text}</p>
      ))}
    </section>
  );
}
