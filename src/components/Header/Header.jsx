import { useState } from "react"
import styles from "./header.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useLang } from "../../i18n/LanguageContext";

function Header({likedCount}) {
  const [menuOpen,setMenuOpen]=useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useApp();
  const { t } = useLang();
  const navigate = useNavigate();

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
          <li><Link to="/">{t("nav.home")}</Link></li>
          <li><Link to="/contact">{t("nav.contact")}</Link></li>
          <li><Link to="/about">{t("nav.about")}</Link></li>
          <li><Link to="/login">{t("nav.signUp")}</Link></li>
        </ul>

        </div>


        <div className={styles.searching}>
           <input
             className={styles.search}
             type="text"
             placeholder={t("search.placeholder")}
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
