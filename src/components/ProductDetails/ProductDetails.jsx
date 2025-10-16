import { useLocation } from "react-router-dom";
import styles from "./productDetails.module.css";

export default function ProductDetails() {
  const { state } = useLocation();
  const product = state?.product;
  if (!product) return <p>No product selected.</p>;

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        <div className={styles.mainImage}>
          <img src={product.image} alt={product.title} />
        </div>

        <div className={styles.details}>
          <h2>{product.title}</h2>
          <p className={styles.reviews}>
            ⭐⭐⭐⭐⭐ <span>(0 Reviews)</span> | <span>In Stock</span>
          </p>
          <h3 className={styles.price}>${product.price}</h3>
          <p className={styles.description}>{product.description}</p>

          <button className={styles.buyBtn}>Buy Now</button>

          <div className={styles.delivery}>
            <p>🚚 <strong>Free Delivery</strong> for orders above $100</p>
            <p>↩️ <strong>Return Delivery</strong> within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
