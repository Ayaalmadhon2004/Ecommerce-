import { motion } from "framer-motion"
import services from "../data/services"
import styles from "./services.module.css"
import Reveal from "../animations/Reveal"
import { fadeUp, scaleIn, staggerContainer } from "../animations/variants"

function Services() {
  return (
    <div className={styles.services}>
        <Reveal className={styles.container} variants={staggerContainer(0.15)}>
            {services.map((service)=>(
                <motion.div className={styles.service} key={service.id} variants={fadeUp}>
                    <motion.div
                      className={styles.imgContainer}
                      variants={scaleIn}
                      whileHover={{ scale: 1.12, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <img src={service.icon} alt={service.title}/>
                    </motion.div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                </motion.div>
            ))}
        </Reveal>
    </div>
  )
}

export default Services
