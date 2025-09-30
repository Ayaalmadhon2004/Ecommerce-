import category from "../data/category"
import styles from "./category.module.css"

export default function Categories() {
  return (
    <div className={styles.category}>
        <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Categories</h3>
        </div>
        <div className={styles.mainHeader}>
            <h2>Browse By Category</h2>
            <div className={styles.arrows}>
            <i class="fa-solid fa-arrow-left"></i>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
            <div className={styles.containerCard}>
              {category.map((category)=>(
                <div className={styles.card} key={category.id}>
                   <div className={styles.img}>
                    <img src={category.vector} alt={category.name} className={styles.nonHoverd}/>
                    <img src={category.vector2} alt={category.name} className={styles.hover}/>
                    <h2>{category.name}</h2>
                   </div>
                </div>
              ))}
            </div>
        </div>
  )
}
