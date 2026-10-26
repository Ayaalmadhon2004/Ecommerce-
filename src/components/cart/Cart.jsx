// src/components/cart/Cart.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp, COUPONS } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./cart.module.css";
import AnimatedNumber from "../animations/AnimatedNumber";
import { fadeUp, easeOut } from "../animations/variants";

const money = (n) => `$${n.toFixed(2)}`;
const rowMotion = {
  layout: true,
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeOut } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.25 } },
};

const parsePrice = (value) =>
  parseFloat(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCode,
    applyCoupon: applyCouponCode,
  } = useApp();

  const items = cart
    .map((item) => ({ ...item, unitPrice: parsePrice(item.price) }))
    .filter((item) => item.unitPrice > 0);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  const discount = appliedCode ? subtotal * COUPONS[appliedCode] : 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    setCouponError(applyCouponCode(couponInput) ? "" : "Invalid coupon code");
  };

  return (
    <motion.div
      className={styles.cartContainer}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th aria-label="Remove"></th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
          {items.length === 0 ? (
            <motion.tr key="empty" {...rowMotion}>
              <td colSpan="5">Your cart is empty</td>
            </motion.tr>
          ) : (
            items.map((item) => {
              return (
                <motion.tr key={item.id} {...rowMotion}>
                  <td className={styles.productInfo}>
                    <img
                      src={item.img || item.image || "/assets/default.png"}
                      alt={item.name}
                      className={styles.productImg}
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <select
                      value={item.quantity}
                      className={styles.quantitySelect}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
                        <option key={q} value={q}>
                          {q.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <AnimatedNumber
                      value={item.unitPrice * item.quantity}
                      format={money}
                    />
                  </td>
                  <td>
                    <motion.button
                      type="button"
                      className={styles.removeBtn}
                      whileHover={{ scale: 1.3, rotate: 90 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      &times;
                    </motion.button>
                  </td>
                </motion.tr>
              );
            })
          )}
          </AnimatePresence>
        </tbody>
      </table>

      <div className={styles.btns}>
        <button
          className={styles.btn}
          onClick={clearCart}
          disabled={items.length === 0}
        >
          Clear Cart
        </button>
        <Link to="/" className={styles.btn}>
          Back to shop
        </Link>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.couponSection}>
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className={styles.couponInput}
          />
          <button className={styles.applyBtn} onClick={applyCoupon}>
            Apply Coupon
          </button>
          <AnimatePresence>
            {couponError && (
              <motion.p
                key="err"
                className={styles.couponError}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {couponError}
              </motion.p>
            )}
            {appliedCode && (
              <motion.p
                key="ok"
                className={styles.couponSuccess}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {appliedCode} applied
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.cartTotalBox}>
          <h3>Cart Total</h3>
          <div className={styles.cartTotalRow}>
            <span>Subtotal:</span>
            <span><AnimatedNumber value={subtotal} format={money} /></span>
          </div>
          <AnimatePresence>
            {appliedCode && (
              <motion.div
                key="discount"
                className={styles.cartTotalRow}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <span>Discount ({appliedCode}):</span>
                <span>-<AnimatedNumber value={discount} format={money} /></span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles.cartTotalRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className={styles.cartTotalRow}>
            <span>Total:</span>
            <span><AnimatedNumber value={total} format={money} /></span>
          </div>
          <button
            className={styles.checkoutBtn}
            onClick={() => navigate("/checkout")}
            disabled={items.length === 0}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
