import { useState } from "react"
import styles from "./header.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

function Header({likedCount}) {
  const [menuOpen,setMenuOpen]=useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useApp();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setMenuOpen(false);
  };
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
          {isLoggedIn ? (
            <>
              <li><span>{user}</span></li>
              <li>
                <button
                  type="button"
                  onClick={() => { logout(); setMenuOpen(false); navigate("/"); }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Sign Up / Login</Link></li>
          )}
        </ul>

        </div>


        <div className={styles.searching}>
           <input
             className={styles.search}
             type="text"
             placeholder="What are you looking for?"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
           />
           <i
             className="fa-solid fa-magnifying-glass"
             role="button"
             aria-label="Search"
             style={{ cursor: "pointer" }}
             onClick={handleSearch}
           ></i>
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
