import { useState } from "react"
import styles from "./header.module.css"
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

function Header({likedCount}) {
  const [menuOpen,setMenuOpen]=useState(false);
  const { cartCount } = useApp();
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <span className={styles.logo}><Link to="/">Exclusive</Link></span>

        
        <div className={styles.menu}>
          <div 
          className={styles.burger} 
          onClick={() => setMenuOpen(!menuOpen)}
          >
         {menuOpen ? <i className="fa-solid fa-x"></i> :<i className="fa-solid fa-bars"></i> }
         </div>
        <ul className={`${styles.list} ${menuOpen ? styles.showMenu : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Sign Up</Link></li>
        </ul>

        </div>


        <div className={styles.searching}>
           <input className={styles.search} type="text" placeholder="What are you looking for?"></input><i className="fa-solid fa-magnifying-glass"></i>
            <Link to="/wishlist" className={styles.loveIcon} aria-label="Wishlist">
              <i className="fa-solid fa-heart"></i>
              {likedCount > 0 && (
                <span className={styles.badge}>{likedCount}</span>
              )}
            </Link>
           <Link to="/cart" className={styles.loveIcon}>
             <i className="fa-solid fa-cart-shopping"></i>
             {cartCount > 0 && (
               <span className={styles.badge}>{cartCount}</span>
             )}
           </Link>
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default Header
