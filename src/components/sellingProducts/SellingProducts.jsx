import styles from "./sellingProducts.module.css"
import sellingProducts from "../data/sellingProducts";

function SellingProducts({liked,handleLike}) {
  return (
    <div className={styles.sellingProducts}>
         <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>This Month</h3>
        </div>
        <div className={styles.mainHeader}>
          <h2>Best Selling Products</h2>
          <button className={styles.btn}>
            View All
          </button>
        </div>
         <div className={styles.mainContainer}>
         {sellingProducts.map((product)=>(
            <div className={styles.card} key={product.id}>
                <div className={styles.imagContainer}>
                    <img src={product.img} alt={product.name}/>
                    <div className={styles.discount}>{product.discount}</div>
                    <div className={styles.seeLove}>
                        <i className={`fa-solid fa-heart ${
                          liked.includes(product.id) ? styles.liked : styles.notLiked
                        }`} onClick={()=>handleLike(product.id)}></i>
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
    </div>
  )
}

export default SellingProducts
