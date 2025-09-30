import styles from "./header.module.css"

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}>Exclusive</span>
        <ul className={styles.list}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Sign Up</a></li>
        </ul>
        <div className={styles.searching}>
           <input className={styles.search} type="text" placeholder="What are you looking for?"></input><i class="fa-solid fa-magnifying-glass"></i>
           <i class="fa-solid fa-heart"></i>
           <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </div>
  )
}

export default Header
