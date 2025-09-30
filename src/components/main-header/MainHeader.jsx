import styles from "./Main-header.module.css"

function MainHeader() {
  return (
    <div className={styles.mainHeader}>
      <div className={styles.left}>
        <ul className={styles.list}>
          <li><a href="#">Woman’s Fashion</a></li>
          <li><a href="#">Men’s Fashion</a></li>
          <li><a href="#">Electronics</a></li>
          <li><a href="#">Home & Lifestyle</a></li>
          <li><a href="#">Medicine</a></li>
          <li><a href="#">Sports & Outdoor</a></li>
          <li><a href="#">Baby’s & Toys</a></li>
          <li><a href="#">Groceries & Pets</a></li>
          <li><a href="#">Health & Beauty</a></li>
        </ul>
      </div>
      <div className={styles.right}>
         <div className={styles.subLeft}>
           <div className={styles.iphone}>
             <img src="/assets/photos/appleWebp.webp" alt="iphone"/>
             <p>iPhone 14 Series</p>
           </div>
           <p className={styles.sale}>Up to 10%<br/> off Voucher</p>
           <button className={styles.btn}>Shop Now <i class="fa-solid fa-arrow-right"></i></button>
         </div>
         <div className={styles.subRight}>
          <img src="/assets/photos/iphoneWebp.webp" alt="iphone"/>
         </div>
      </div>
    </div>
  )
}

export default MainHeader
