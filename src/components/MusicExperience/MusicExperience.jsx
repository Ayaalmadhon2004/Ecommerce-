import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../../context/AppContext"
import styles from "./musicExperience.module.css"

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

  const handleBuyNow = () => {
    if (!cart.some((item) => item.id === jblSpeaker.id)) handleCart(jblSpeaker)
    navigate("/checkout")
  }

  return (
    <div className={styles.musicExperience}>
    <div className={styles.left}>
       <h2>Categories</h2>
       <p>Enhance Your<br/> Music Experience</p>
       <ul className={styles.timing}>
        <li>{pad(hours)}<br/><span>Hours</span></li>
        <li>{pad(days)}<br/><span>Days</span></li>
        <li>{pad(minutes)}<br/><span>minutes</span></li>
        <li>{pad(seconds)}<br/><span>seconds</span></li>
       </ul>
       <button type="button" className={styles.btn} onClick={handleBuyNow}>Buy Now !</button>
    </div>
    <div className={styles.right}>
      <div className={styles.blur}></div>
      <img src="assets/photos/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png" alt="JBL speaker"/>
    </div>
    </div>
  )
}

export default MusicExperience
