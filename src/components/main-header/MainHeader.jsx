import styles from "./Main-header.module.css"

function MainHeader() {
  return (
    <div className={styles.mainHeader}>
      <div className={styles.left}>
        <ul className={styles.list}>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Woman’s Fashion</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Men’s Fashion</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Electronics</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Home & Lifestyle</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Medicine</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Sports & Outdoor</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Baby’s & Toys</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Groceries & Pets</a></li>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Health & Beauty</a></li>
        </ul>
      </div>
      <div className={styles.right}>
         <div className={styles.subLeft}>
           <div className={styles.iphone}>
             <img src="/assets/photos/appleWebp.webp" alt="iphone"/>
             <p>iPhone 14 Series</p>
           </div>
           <p className={styles.sale}>Up to 10%<br/> off Voucher</p>
           <button className={styles.btn}>Shop Now <i className="fa-solid fa-arrow-right"></i></button>
         </div>
         <div className={styles.subRight}>
          <img src="/assets/photos/iphoneWebp.webp" alt="iphone"/>
         </div>
      </div>
    </div>
  )
}

export default MainHeader
