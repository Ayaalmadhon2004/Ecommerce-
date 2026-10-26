import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./productDetails.module.css";
import { fadeUp, slideRight, staggerContainer } from "../animations/variants";
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
        <motion.div
          className={styles.mainImage}
          variants={slideRight}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.subImages}>
            {thumbs.map((src, i) => (
              <motion.img
                key={i}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                src={src}
                alt={`${product.title} view ${i + 1}`}
                className={i === selected ? styles.thumbActive : ""}
                aria-current={i === selected}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={mainSrc + selected}
              src={mainSrc}
              alt={product.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={styles.details}
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={fadeUp}>{product.title}</motion.h2>
          <motion.p variants={fadeUp} className={styles.reviews}>
            <Stars count={product.rating?.rate ?? 0} />{" "}
            <span>({product.rating?.count ?? 0} Reviews)</span> | <span>In Stock</span>
          </motion.p>
          <motion.h3 variants={fadeUp} className={styles.price}>${product.price}</motion.h3>
          <motion.p variants={fadeUp} className={styles.description}>{product.description}</motion.p>

          <motion.div variants={fadeUp} className={styles.actions}>
            <div className={styles.qty}>
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <motion.span
                key={qty}
                initial={{ scale: 1.5, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                style={{ display: "inline-block" }}
              >{qty}</motion.span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <motion.button className={styles.buyBtn} onClick={handleBuyNow} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>Buy Now</motion.button>
            <motion.button
              type="button"
              className={styles.cartBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                for (let i = 0; i < qty; i++) handleCart(product);
              }}
            >
              Add To Cart
            </motion.button>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.delivery}>
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
            <AnimatePresence>
            {checked && (
              <motion.p
                className={styles.deliveryMsg}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {postal.trim() ? "Delivery available" : "Please enter a postal code"}
              </motion.p>
            )}
            </AnimatePresence>
            <hr/>
            <div className={styles.container}>
              <img src="assets/Icon-return.png" alt="Return Delivery"/>
              <p><strong>Return Delivery</strong><br/> Free 30 Days Delivery Returns.{" "}
                <button type="button" className={styles.linkBtn} onClick={() => setShowReturn((v) => !v)}>Details</button>
              </p>
            </div>
            <AnimatePresence>
            {showReturn && (
              <motion.p
                className={styles.returnPolicy}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                Items can be returned within 30 days of delivery if unused and in original packaging. Refunds are issued to the original payment method once the return is received.
              </motion.p>
            )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
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
