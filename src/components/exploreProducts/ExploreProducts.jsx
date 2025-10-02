import styles from "./exploreProducts.module.css"
import exploreProducts from "../data/exploreProducts"

function ExploreProducts() {
  return (
    <div className={styles.exploreProducts}>
        <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Our Products</h3>
        </div>
         <div className={styles.mainHeader}>
          <h2>Explore Our Products</h2>
           <div className={styles.arrows}>
            <i class="fa-solid fa-arrow-left"></i>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className={styles.mainContainer}>
         {exploreProducts.map((product)=>(
            <div className={styles.card} key={product.id}>
                <div className={styles.imagContainer}>
                    <img src={product.img} alt={product.name}/>
                    <div className={styles.discount}>{product.discount}</div>
                    <div className={styles.seeLove}>
                        <i className="fa-solid fa-heart"></i>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                </div>
                <div className={styles.cardBody}>
                    <h4>{product.name}</h4>
                    <div className={styles.prices}>
                        <span className={styles.price}>{product.price}</span>
                        <span className={styles.prevPrice}>{product.prevPrice}</span>
                    </div>
                    <div className={styles.stars}>
                            {product.stars}
                            ({product.rate})
                    </div>
                </div>
            </div>
         ))}
        </div>
        <button className={styles.btn}>
            View All Products
        </button>

    </div>
  )
}

export default ExploreProducts
