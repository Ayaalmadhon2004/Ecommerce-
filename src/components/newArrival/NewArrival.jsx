import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./newArrival.module.css"
import Reveal from "../animations/Reveal"
import { scaleIn, staggerContainer } from "../animations/variants"

function ShopButton({ onClick }) {
  return (
    <motion.button
      className={styles.btn}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      Shop Now
    </motion.button>
  )
}

function NewArrival() {
  const navigate = useNavigate();
  const shop = (category) => navigate(`/shop?category=${encodeURIComponent(category)}`);
  return (
    <div className={styles.newArrival}>
        <Reveal className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Featured</h3>
        </Reveal>
         <Reveal className={styles.mainHeader}>
          <h2>New Arrival</h2>
        </Reveal>
        <Reveal className={styles.mainContainer} variants={staggerContainer(0.15)} amount={0.15}>
            <motion.div className={styles.left} variants={scaleIn}>
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <ShopButton onClick={() => shop("electronics")} />
            </motion.div>
            <div className={styles.right}>
                <motion.div className={styles.top} variants={scaleIn}>
                  <h3>Women’s Collections</h3>
                  <p>Featured woman collections that give you another vibe.</p>
                  <ShopButton onClick={() => shop("women's clothing")} />
                </motion.div>
                <div className={styles.bottom}>
                    <motion.div className={styles.subLeft} variants={scaleIn}>
                      <h3>Speakers</h3>
                      <p>Amazon wireless speakers</p>
                      <ShopButton onClick={() => shop("electronics")} />
                    </motion.div>
                    <motion.div className={styles.subRight} variants={scaleIn}>
                     <h3>Perfume</h3>
                     <p>GUCCI INTENSE OUD EDP</p>
                     <ShopButton onClick={() => shop("jewelery")} />
                    </motion.div>
                </div>
            </div>
        </Reveal>
    </div>
  )
}

export default NewArrival
