import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./productDetails.module.css";
import { useApp } from "../../context/AppContext";
import Stars from "../Stars/Stars";
import SellingProducts from "../sellingProducts/SellingProducts";

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, likes, handleLike, handleCart } = useApp();
  const product = state?.product;
  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState(1);
  const [postal, setPostal] = useState("");
  const [checked, setChecked] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  if (!product) return <p>No product selected.</p>;

  const cover = product.img || product.image;
  const gallery = Array.isArray(product.images) && product.images.length
    ? product.images
    : [cover];
  const thumbs = Array.from({ length: 4 }, (_, i) => gallery[i % gallery.length]);
  const mainSrc = thumbs[selected] || cover;

  const handleBuyNow = () => {
    if (!cart.some((item) => item.id === product.id)) handleCart(product);
    navigate("/checkout");
  };

  const handleProductDetails = (next) => {
    navigate("/productDetails", { state: { product: next } });
    window.scrollTo(0, 0);
  };

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
            <button className={styles.buyBtn} onClick={handleBuyNow}>Buy Now</button>
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
            <div className={styles.postal}>
              <input
                type="text"
                placeholder="Postal code"
                value={postal}
                onChange={(e) => { setPostal(e.target.value); setChecked(false); }}
              />
              <button type="button" onClick={() => setChecked(true)}>Check</button>
            </div>
            {checked && (
              <p className={styles.deliveryMsg}>
                {postal.trim() ? "Delivery available" : "Please enter a postal code"}
              </p>
            )}
            <hr/>
            <div className={styles.container}>
              <img src="assets/Icon-return.png" alt="Return Delivery"/>
              <p><strong>Return Delivery</strong><br/> Free 30 Days Delivery Returns.{" "}
                <button type="button" className={styles.linkBtn} onClick={() => setShowReturn((v) => !v)}>Details</button>
              </p>
            </div>
            {showReturn && (
              <p className={styles.returnPolicy}>
                Items can be returned within 30 days of delivery if unused and in original packaging. Refunds are issued to the original payment method once the return is received.
              </p>
            )}
          </div>
        </div>
      </div>
      <SellingProducts
      liked={likes.selling}
      handleLike={(id) => handleLike("selling", id)}
      handleCart={handleCart}
      handleProductDetails={handleProductDetails}
      varient="related"
      />
    </div>
  );
}
