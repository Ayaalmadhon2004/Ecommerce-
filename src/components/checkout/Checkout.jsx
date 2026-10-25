import { useState } from "react";
import { useApp } from "../../context/AppContext";
import styles from "./checkout.module.css";

const parsePrice = value =>
  parseFloat(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;

export default function Checkout() {
    const { cart, clearCart } = useApp();
    const [paymentMethod, setPaymentMethod] = useState("bank");
    const [coupon, setCoupon] = useState("");

    const handleCouponChange = e => setCoupon(e.target.value);

    const handleApplyCoupon = () => {
    alert(`Coupon applied: ${coupon}`);
    };

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = e => {
      e.preventDefault();
      if (cart.length === 0) return;
      clearCart();
      setOrderPlaced(true);
    };

  const subtotal = cart.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 1),
    0
  );

  if (orderPlaced) {
    return (
      <div className={styles.checkout}>
        <div className={styles.left}>
          <h2>Thank you!</h2>
          <p>
            Your order has been placed ({paymentMethod === "bank" ? "Bank" : "Cash on delivery"}).
            A confirmation will be sent to your email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.left}>
        <h2>Billing Details</h2>
        <form id="checkout-form" className={styles.form} onSubmit={handlePlaceOrder}>
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" type="text" name="firstName" required />

          <label htmlFor="company-name">Company Name</label>
          <input id="company-name" type="text" name="companyName" />

          <label htmlFor="street-name">Street Name</label>
          <input id="street-name" type="text" name="streetName" required />

          <label htmlFor="apartment">Apartment, floor, etc (optional)</label>
          <input id="apartment" type="text" name="apartment" />

          <label htmlFor="town-city">Town/City</label>
          <input id="town-city" type="text" name="townCity" required />

          <label htmlFor="phone-number">Phone Number</label>
          <input id="phone-number" type="tel" name="phoneNumber" required />

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" required />

          <div className={styles.checkbox}>
            <input type="checkbox" id="saveInfo" className={styles.check}/>
            <label htmlFor="saveInfo">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
      </div>

      <div className={styles.right}>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => {
            const qty = item.quantity || 1;
            const name = item.name || item.title;
            const lineTotal = parsePrice(item.price) * qty;
            return (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.img || item.image || "/assets/default.png"}
                  alt={name}
                  className={styles.img}
                />
                <span className={styles.name}>
                  {name} <small className={styles.qty}>x{qty}</small>
                </span>
                <span className={styles.price}>${lineTotal.toFixed(2)}</span>
              </div>
            );
          })
        )}
        <div className={styles.price}>
          <div className={styles.cartTotalRow}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.cartTotalRow}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className={styles.cartTotalRow}>
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        </div>

        <div className={styles.container}>
        <div className={styles.paymentMethods}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="payment"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={() => setPaymentMethod("bank")}
          />
          <span>Bank</span>
          <div className={styles.icons}>
            <img src="/assets/payment/image 32.png" alt="Visa" />
            <img src="/assets/payment/image 30.png" alt="MasterCard" />
            <img src="/assets/payment/image 31.png" alt="KNet" />
            <img src="/assets/payment/image 33.png" alt="Other" />
          </div>
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <span>Cash on delivery</span>
        </label>
      </div>

      <div className={styles.couponSection}>
        <input
          type="text"
          placeholder="Coupon Code"
          value={coupon}
          onChange={handleCouponChange}
          className={styles.couponInput}
        />
        <button type="button" className={styles.applyBtn} onClick={handleApplyCoupon}>
          Apply Coupon
        </button>
      </div>

      <button
        type="submit"
        form="checkout-form"
        className={styles.placeOrderBtn}
        disabled={cart.length === 0}
      >
        Place Order
      </button>
    </div>
      </div>
    </div>
  );
}
