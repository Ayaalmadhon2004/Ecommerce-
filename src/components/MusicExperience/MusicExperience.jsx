import styles from "./musicExperience.module.css"

function MusicExperience() {
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
       <div className={styles.btn}>Buy Now !</div>
    </div>
    <div className={styles.right}>
      <img src="assets/photos/headSet.webp" alt="headSet image"/>
    </div>
    </div>
  )
}

export default MusicExperience
