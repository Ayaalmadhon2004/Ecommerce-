import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./productDetails.module.css";
import { useApp } from "../../context/AppContext";
import Stars from "../Stars/Stars";
import SellingProducts from "../sellingProducts/SellingProducts";

export default function ProductDetails() {
  const { state } = useLocation();
  const product = state?.product;
  const { handleCart } = useApp();
  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState(1);
  if (!product) return <p>No product selected.</p>;

  const cover = product.img || product.image;
  const gallery = Array.isArray(product.images) && product.images.length
    ? product.images
    : [cover];
  const thumbs = Array.from({ length: 4 }, (_, i) => gallery[i % gallery.length]);
  const mainSrc = thumbs[selected] || cover;

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        <div className={styles.mainImage}>
          <div className={styles.subImages}>
            {thumbs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.title} view ${i + 1}`}
                className={i === selected ? styles.thumbActive : ""}
                aria-current={i === selected}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>
          <img src={mainSrc} alt={product.title} />
        </div>

        <div className={styles.details}>
          <h2>{product.title}</h2>
          <p className={styles.reviews}>
            <Stars count={product.rating?.rate ?? 0} />{" "}
            <span>({product.rating?.count ?? 0} Reviews)</span> | <span>In Stock</span>
          </p>
          <h3 className={styles.price}>${product.price}</h3>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <div className={styles.qty}>
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <span>{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className={styles.buyBtn}>Buy Now</button>
            <button
              type="button"
              className={styles.cartBtn}
              onClick={() => {
                for (let i = 0; i < qty; i++) handleCart(product);
              }}
            >
              Add To Cart
            </button>
          </div>

          <div className={styles.delivery}>
            <div className={styles.container}>
              <img src="assets/icon-delivery (1).png" alt="Free Delivery"/>
              <p><strong>Free Delivery</strong><br/> Enter your postal code for Delivery Availability</p>
            </div>
            <hr/>
            <div className={styles.container}>
              <img src="assets/Icon-return.png" alt="Return Delivery"/>
              <p><strong>Return Delivery</strong><br/> Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
      <SellingProducts
      liked={[]} 
      handleLike={() => {}}
      varient="related"
      />
    </div>
  );
}
