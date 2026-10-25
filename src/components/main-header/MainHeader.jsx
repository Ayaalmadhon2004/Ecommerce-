import { Link } from "react-router-dom"
import styles from "./Main-header.module.css"

const categories = [
  { label: "Woman’s Fashion", category: "women's clothing", icon: "fa-shirt" },
  { label: "Men’s Fashion", category: "men's clothing", icon: "fa-user-tie" },
  { label: "Electronics", category: "electronics", icon: "fa-laptop" },
  { label: "Home & Lifestyle", icon: "fa-house" },
  { label: "Medicine", icon: "fa-briefcase-medical" },
  { label: "Sports & Outdoor", icon: "fa-dumbbell" },
  { label: "Baby’s & Toys", icon: "fa-baby" },
  { label: "Groceries & Pets", icon: "fa-paw" },
  { label: "Health & Beauty", icon: "fa-spa" },
]

function MainHeader() {
  return (
    <div className={styles.mainHeader}>
      <aside className={styles.left}>
        <ul className={styles.list}>
          {categories.map(({ label, icon, category }) => (
            <li key={label}>
              <Link to={category ? `/shop?category=${encodeURIComponent(category)}` : "/shop"}>
                <i className={`fa-solid ${icon}`}></i>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className={styles.right}>
         <div className={styles.subLeft}>
           <div className={styles.iphone}>
             <img src="/assets/photos/appleWebp.webp" alt="Apple"/>
             <p>iPhone 14 Series</p>
           </div>
           <h2 className={styles.sale}>Up to 10%<br/> off Voucher</h2>
           <Link to="/shop" className={styles.btn}>
             Shop Now <i className="fa-solid fa-arrow-right"></i>
           </Link>
         </div>
         <div className={styles.subRight}>
          <img src="/assets/photos/iphoneWebp.webp" alt="iPhone 14"/>
         </div>
      </div>
    </div>
  )
}

export default MainHeader
