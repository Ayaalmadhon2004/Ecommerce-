import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

// Counts smoothly from the previous value to the new one.
// `format` turns the in-between number into the displayed text.
export default function AnimatedNumber({ value, format = (n) => String(n) }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, format);
  const first = useRef(true);

  useEffect(() => {
    if (first.current || reduce) {
      first.current = false;
      mv.set(value);
      return undefined;
    }
    const controls = animate(mv, value, { duration: 0.5, ease: "easeOut" });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return <motion.span>{text}</motion.span>;
}
