import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import styles from "./Main-header.module.css"
import { fadeUp, slideLeft, slideRight, staggerContainer, easeOut } from "../animations/variants"

const MotionLink = motion.create(Link)

const phoneEnter = {
  hidden: slideLeft.hidden,
  visible: { ...slideLeft.visible, transition: { ...slideLeft.visible.transition, delay: 0.4 } },
}

const categories = [
  { label: "Woman’s Fashion", category: "women's clothing", icon: "fa-shirt" },
  { label: "Men’s Fashion", category: "men's clothing", icon: "fa-user-tie" },
  { label: "Electronics", category: "electronics", icon: "fa-laptop" },
  { label: "Home & Lifestyle", icon: "fa-house" },
  { label: "Medicine", icon: "fa-briefcase-medical" },
  { label: "Sports & Outdoor", icon: "fa-dumbbell" },
  { label: "Baby’s & Toys", icon: "fa-baby" },
  { label: "Groceries & Pets", icon: "fa-paw" },
  { label: "Health & Beauty", icon: "fa-spa" },
]

function MainHeader() {
  const reduce = useReducedMotion()
  return (
    <div className={styles.mainHeader}>
      <aside className={styles.left}>
        <motion.ul
          className={styles.list}
          variants={staggerContainer(0.05, 0.2)}
          initial="hidden"
          animate="visible"
        >
          {categories.map(({ label, icon, category }) => (
            <motion.li key={label} variants={slideRight}>
              <Link to={category ? `/shop?category=${encodeURIComponent(category)}` : "/shop"}>
                <i className={`fa-solid ${icon}`}></i>
                {label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </aside>
      <motion.div
        className={styles.right}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
         <motion.div
           className={styles.subLeft}
           variants={staggerContainer(0.15, 0.3)}
           initial="hidden"
           animate="visible"
         >
           <motion.div className={styles.iphone} variants={fadeUp}>
             <img src="/assets/photos/appleWebp.webp" alt="Apple"/>
             <p>iPhone 14 Series</p>
           </motion.div>
           <motion.h2 className={styles.sale} variants={fadeUp}>Up to 10%<br/> off Voucher</motion.h2>
           <motion.div variants={fadeUp} style={{ display: "inline-block" }}>
             <MotionLink
               to="/shop"
               className={styles.btn}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               Shop Now <i className="fa-solid fa-arrow-right"></i>
             </MotionLink>
           </motion.div>
         </motion.div>
         <motion.div
           className={styles.subRight}
           variants={phoneEnter}
           initial="hidden"
           animate="visible"
         >
          <motion.img
            src="/assets/photos/iphoneWebp.webp"
            alt="iPhone 14"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
         </motion.div>
      </motion.div>
    </div>
  )
}

export default MainHeader
