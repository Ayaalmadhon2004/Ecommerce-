import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../animations/useMediaQuery";
import { easeOut } from "../animations/variants";
import styles from "./header.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../i18n/LanguageContext";

const menuVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: easeOut, staggerChildren: 0.05 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// Cart/wishlist counter that pops whenever the number changes.
function Badge({ count, className }) {
  return (
    <motion.span
      key={count}
      className={className}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 12 }}
    >
      {count}
    </motion.span>
  );
}

function Header({likedCount}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useApp();
  const { t } = useLang();
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
    <motion.div
      className={styles.header}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <div className={styles.container}>
        <span className={styles.logo}><Link to="/">Exclusive</Link></span>

        
        <div className={styles.menu}>
          <motion.div
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.85 }}
          >
         <AnimatePresence mode="wait" initial={false}>
           <motion.span
             key={menuOpen ? "close" : "open"}
             style={{ display: "inline-block" }}
             initial={{ rotate: -90, opacity: 0 }}
             animate={{ rotate: 0, opacity: 1 }}
             exit={{ rotate: 90, opacity: 0 }}
             transition={{ duration: 0.15 }}
           >
             {menuOpen ? <i className="fa-solid fa-x"></i> :<i className="fa-solid fa-bars"></i> }
           </motion.span>
         </AnimatePresence>
         </motion.div>
        <AnimatePresence>
        {(!isMobile || menuOpen) && (
        <motion.ul
          key="nav-list"
          className={`${styles.list} ${menuOpen ? styles.showMenu : ""}`}
          {...(isMobile ? { variants: menuVariants, initial: "hidden", animate: "visible", exit: "exit" } : {})}
        >
          {[
            ["/", t("nav.home")],
            ["/contact", t("nav.contact")],
            ["/about", t("nav.about")],
          ].map(([to, label]) => (
            <motion.li
              key={to}
              variants={itemVariants}
              style={{ position: "relative" }}
              onMouseEnter={() => setHoveredLink(to)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link to={to}>{label}</Link>
              {hoveredLink === to && !isMobile && (
                <motion.span
                  layoutId="nav-underline"
                  style={{ position: "absolute", left: 0, right: 0, bottom: -4, height: 2, background: "currentColor" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </motion.li>
          ))}
          {isLoggedIn ? (
            <>
              <motion.li variants={itemVariants}><span>{user}</span></motion.li>
              <motion.li variants={itemVariants}>
                <button
                  type="button"
                  onClick={() => { logout(); setMenuOpen(false); navigate("/"); }}
                >
                  Logout
                </button>
              </motion.li>
            </>
          ) : (
            <motion.li variants={itemVariants}><Link to="/login">{t("nav.signUp")}</Link></motion.li>
          )}
        </motion.ul>
        )}
        </AnimatePresence>

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
            <motion.i className="fa-solid fa-heart" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}></motion.i>
             {likedCount > 0 && (
               <Badge count={likedCount} className={styles.badge} />
             )}
            </Link>
           <Link to="/cart" className={styles.loveIcon}>
             <motion.i className="fa-solid fa-cart-shopping" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}></motion.i>
             {cartCount > 0 && (
               <Badge count={cartCount} className={styles.badge} />
             )}
           </Link>
        </div>
      </div>
      <hr/>
    </motion.div>
  )
}

export default Header
