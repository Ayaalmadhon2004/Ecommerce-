import { motion } from "framer-motion";

// Number that slides in whenever its value changes (e.g. countdown digits).
export default function FlipNumber({ value }) {
  return (
    <motion.div
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.div>
  );
}
