import styles from "./TopHeader.module.css";

function TopHeader() {
  return (
    <div className={styles.topContainer}>
     <div className={styles.topHeader}>
        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
        <select className={styles.selection}>
          <option value ="English">English</option>
          <option value="Arabic">Arabic</option>
        </select>
     </div>
    </div>
  )
}

export default TopHeader
