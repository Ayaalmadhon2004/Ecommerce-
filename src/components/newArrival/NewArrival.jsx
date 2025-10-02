import styles from "./newArrival.module.css"

function NewArrival() {
  return (
    <div className={styles.newArrival}>
        <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Featured</h3>
        </div>
         <div className={styles.mainHeader}>
          <h2>New Arrival</h2>
        </div>
        <div className={styles.mainContainer}>
            <div className={styles.left}>
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <button className={styles.btn}>Shop Now</button>
            </div>
            <div className={styles.right}>
                <div className={styles.top}>
                  <h3>Women’s Collections</h3>
                  <p>Featured woman collections that give you another vibe.</p>
                  <button className={styles.btn}>Shop Now</button>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.subLeft}>
                      <h3>Speakers</h3>
                      <p>Amazon wireless speakers</p>
                      <button className={styles.btn}>Shop Now</button>
                    </div>
                    <div className={styles.subRight}>
                     <h3>Perfume</h3>
                     <p>GUCCI INTENSE OUD EDP</p>
                     <button className={styles.btn}>Shop Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewArrival
