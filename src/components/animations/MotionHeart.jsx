import { motion } from "framer-motion";

// Wishlist heart that pops when liked and squishes when pressed.
export default function MotionHeart({ isLiked, likedClass, notLikedClass, onClick }) {
  return (
    <motion.i
      className={`fa-solid fa-heart ${isLiked ? likedClass : notLikedClass}`}
      onClick={onClick}
      initial={false}
      animate={isLiked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.35 }}
    />
  );
}
