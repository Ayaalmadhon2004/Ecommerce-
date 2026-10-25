// src/components/cart/Cart.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp, COUPONS } from "../../context/AppContext";
import styles from "./cart.module.css";

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
    <div className={styles.cartContainer}>
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
          {items.length === 0 ? (
            <tr>
              <td colSpan="5">Your cart is empty</td>
            </tr>
          ) : (
            items.map((item) => {
              return (
                <tr key={item.id}>
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
                  <td>${(item.unitPrice * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              );
            })
          )}
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
          {couponError && <p className={styles.couponError}>{couponError}</p>}
          {appliedCode && (
            <p className={styles.couponSuccess}>{appliedCode} applied</p>
          )}
        </div>

        <div className={styles.cartTotalBox}>
          <h3>Cart Total</h3>
          <div className={styles.cartTotalRow}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {appliedCode && (
            <div className={styles.cartTotalRow}>
              <span>Discount ({appliedCode}):</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className={styles.cartTotalRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className={styles.cartTotalRow}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
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
    </div>
  );
}
