import { useNavigate } from "react-router-dom"
import { useApp } from "../../context/AppContext"
import styles from "./musicExperience.module.css"

const jblSpeaker = {
  id: "jbl-boombox-2",
  title: "JBL Boombox 2 Speaker",
  price: 250,
  image: "assets/photos/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png",
  img: "assets/photos/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png",
}

function MusicExperience() {
  const { cart, handleCart } = useApp()
  const navigate = useNavigate()

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
        <li>23<br/><span>Hours</span></li>
        <li>05<br/><span>Days</span></li>
        <li>59<br/><span>minutes</span></li>
        <li>35 <br/><span>seconds</span></li>
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
