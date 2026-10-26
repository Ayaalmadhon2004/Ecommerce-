import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "./variants";

// Wraps a routed page: fades/slides in on enter, fades out on exit.
export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : 16;

  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } }}
      exit={{ opacity: 0, y: -offset, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}
