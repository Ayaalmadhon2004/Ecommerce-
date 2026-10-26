import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "./variants";

// Reveals its children when scrolled into view (once).
export default function Reveal({
  children,
  variants = fadeUp,
  as = "div",
  amount = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    return <Tag {...rest}>{children}</Tag>;
  }

  return (
    <Tag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
