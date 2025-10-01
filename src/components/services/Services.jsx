import services from "../data/services"
import styles from "./services.module.css"

function Services() {
  return (
    <div className={styles.services}>
        <div className={styles.container}>
            {services.map((service)=>(
                <div className={styles.service} key={service.id}>
                    <div className={styles.imgContainer}><img src={service.icon} alt={service.title}/></div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Services
