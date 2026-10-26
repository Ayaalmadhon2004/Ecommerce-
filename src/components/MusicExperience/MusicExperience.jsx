import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../../context/AppContext"
import { motion, useReducedMotion } from "framer-motion"
import styles from "./musicExperience.module.css"
import { fadeUp, scaleIn, slideLeft, staggerContainer } from "../animations/variants"

const pad = (n) => String(n).padStart(2, "0");

const jblSpeaker = {
  id: "jbl-boombox-2",
  title: "JBL Boombox 2 Speaker",
  price: 250,
  image: "assets/photos/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png",
  img: "assets/photos/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png",
}

function useCountdown(days) {
  const [target] = useState(() => Date.now() + days * 24 * 60 * 60 * 1000);
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.floor(left / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function MusicExperience() {
  const { cart, handleCart } = useApp()
  const navigate = useNavigate()
  const { days, hours, minutes, seconds } = useCountdown(5);
  const reduce = useReducedMotion();

  const handleBuyNow = () => {
    if (!cart.some((item) => item.id === jblSpeaker.id)) handleCart(jblSpeaker)
    navigate("/checkout")
  }

  return (
    <div className={styles.musicExperience}>
    <motion.div
      className={styles.left}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
       <motion.h2 variants={fadeUp}>Categories</motion.h2>
       <motion.p variants={fadeUp}>Enhance Your<br/> Music Experience</motion.p>
       <motion.ul className={styles.timing} variants={staggerContainer(0.1)}>
        <motion.li variants={scaleIn}>{pad(hours)}<br/><span>Hours</span></motion.li>
        <motion.li variants={scaleIn}>{pad(days)}<br/><span>Days</span></motion.li>
        <motion.li variants={scaleIn}>{pad(minutes)}<br/><span>minutes</span></motion.li>
        <motion.li variants={scaleIn}>{pad(seconds)}<br/><span>seconds</span></motion.li>
       </motion.ul>
       <motion.button
         type="button"
         className={styles.btn}
         onClick={handleBuyNow}
         variants={fadeUp}
         whileHover={{ scale: 1.06 }}
         whileTap={{ scale: 0.95 }}
       >
         Buy Now !
       </motion.button>
    </motion.div>
    <motion.div
      className={styles.right}
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.blur}></div>
      <motion.img
        src="assets/photos/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
        alt="JBL speaker"
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
    </div>
  )
}

export default MusicExperience
