import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./scrollEffects.module.css";

// Thin bar at the top of the page that fills as the user scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });

  return <motion.div className={styles.progress} style={{ scaleX }} aria-hidden="true" />;
}
