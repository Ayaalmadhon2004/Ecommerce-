import styles from "./Main-header.module.css"

const categories = [
  { label: "Woman’s Fashion", icon: "fa-shirt" },
  { label: "Men’s Fashion", icon: "fa-user-tie" },
  { label: "Electronics", icon: "fa-laptop" },
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
          {categories.map(({ label, icon }) => (
            <li key={label}>
              <a href="#!" onClick={(e) => e.preventDefault()}>
                <i className={`fa-solid ${icon}`}></i>
                {label}
              </a>
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
           <a href="#!" className={styles.btn} onClick={(e) => e.preventDefault()}>
             Shop Now <i className="fa-solid fa-arrow-right"></i>
           </a>
         </div>
         <div className={styles.subRight}>
          <img src="/assets/photos/iphoneWebp.webp" alt="iPhone 14"/>
         </div>
      </div>
    </div>
  )
}

export default MainHeader
