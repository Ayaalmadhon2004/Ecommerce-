import { useState } from "react"
import styles from "./header.module.css"

function Header({likedCount}) {
  const [menuOpen,setMenuOpen]=useState(false);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}>Exclusive</span>

        
        <div className={styles.menu}>
           <div 
          className={styles.burger} 
          onClick={() => setMenuOpen(!menuOpen)}
           >
         {menuOpen ? <i class="fa-solid fa-x"></i> :<i className="fa-solid fa-bars"></i> }
         </div>
        <ul className={`${styles.list} ${menuOpen ? styles.showMenu : ""}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Sign Up</a></li>
        </ul>

        </div>


        <div className={styles.searching}>
           <input className={styles.search} type="text" placeholder="What are you looking for?"></input><i class="fa-solid fa-magnifying-glass"></i>
            <div className={styles.loveIcon}>
            <i className="fa-solid fa-heart"></i>
             {likedCount > 0 && (
               <span className={styles.badge}>{likedCount}</span>
             )}
            </div>
           <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default Header
