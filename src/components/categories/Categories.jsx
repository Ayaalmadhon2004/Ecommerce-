import category from "../data/category"
import styles from "./category.module.css"
import useHorizontalScroll from "../../hooks/useHorizontalScroll"
import { motion } from "framer-motion"
import Reveal from "../animations/Reveal"
import { cardVariants, cardViewport } from "../animations/variants"

export default function Categories() {
  const { trackRef, edges, scrollTrack, updateEdges } = useHorizontalScroll()

  return (
    <div className={styles.category}>
        <Reveal className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Categories</h3>
        </Reveal>
        <Reveal className={styles.mainHeader}>
            <h2>Browse By Category</h2>
            <div className={styles.arrows}>
            <i
              className={`fa-solid fa-arrow-left ${edges.start ? styles.arrowDisabled : ""}`}
              role="button"
              aria-label="Scroll left"
              aria-disabled={edges.start}
              onClick={() => scrollTrack(-1)}
            ></i>
            <i
              className={`fa-solid fa-arrow-right ${edges.end ? styles.arrowDisabled : ""}`}
              role="button"
              aria-label="Scroll right"
              aria-disabled={edges.end}
              onClick={() => scrollTrack(1)}
            ></i>
          </div>
        </Reveal>
            <div className={styles.containerCard} ref={trackRef} onScroll={updateEdges}>
              {category.map((category, index)=>(
                <motion.div
                  className={styles.card}
                  key={category.id}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  whileTap={{ scale: 0.96 }}
                  viewport={cardViewport}
                >
                   <div className={styles.img}>
                    <img src={category.vector} alt={category.name} className={styles.nonHoverd}/>
                    <img src={category.vector2} alt={category.name} className={styles.hover}/>
                    <h2>{category.name}</h2>
                   </div>
                </motion.div>
              ))}
            </div>
        </div>
  )
}
