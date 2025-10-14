import { useEffect, useState } from "react";
import styles from "./checkout.module.css";

export default function Checkout({ cart: initialCart }) {
    const [paymentMethod, setPaymentMethod] = useState("bank");
    const [coupon, setCoupon] = useState("");

    const handleCouponChange = e => setCoupon(e.target.value);

    const handleApplyCoupon = () => {
    alert(`Coupon applied: ${coupon}`);
    };

    const handlePlaceOrder = () => {
    alert(`Order placed with payment method: ${paymentMethod}`);
    };
    const [cart, setCart] = useState(() =>
    (initialCart || []).map(item => ({
      ...item,
      price:
        typeof item.price === "number"
          ? `$${item.price}`
          : item.price || "$0",
      quantity: item.quantity || 1,
    }))
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(
      (item.price != null ? item.price.toString() : "0").replace("$", "")
    ) || 0;
    return acc + price * item.quantity;
  }, 0);

  const filteredCart = cart.filter(item => {
    const price = parseFloat(
      (item.price != null ? item.price.toString() : "0").replace("$", "")
    ) || 0;
    return price > 0;
  });

  return (
    <div className={styles.checkout}>
      <div className={styles.left}>
        <h2>Billing Details</h2>
        <form className={styles.form}>
          <label htmlFor="first-name">First Name</label><br/>
          <input id="first-name" type="text" name="firstName" required /><br/>

          <label htmlFor="company-name">Company Name</label><br/>
          <input id="company-name" type="text" name="companyName" /><br/>

          <label htmlFor="street-name">Street Name</label><br/>
          <input id="street-name" type="text" name="streetName" required /><br/>

          <label htmlFor="apartment">Apartment, floor, etc (optional)</label><br/>
          <input id="apartment" type="text" name="apartment" /><br/>

          <label htmlFor="town-city">Town/City</label><br/>
          <input id="town-city" type="text" name="townCity" required /><br/>

          <label htmlFor="phone-number">Phone Number</label><br/>
          <input id="phone-number" type="tel" name="phoneNumber" required /><br/>

          <label htmlFor="email">Email Address</label><br/>
          <input id="email" type="email" name="email" required /><br/>

          <div className={styles.checkbox}>
            <input type="checkbox" id="saveInfo" className={styles.check}/>
            <label htmlFor="saveInfo">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
      </div>

      <div className={styles.right}>
        {filteredCart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          filteredCart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.image || "/assets/default.png"}
                alt={item.title}
                className={styles.img}
              />
              <span className={styles.name}>{item.title}</span>
              <span className={styles.price}>{item.price}</span>
            </div>
          ))
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
        <button className={styles.applyBtn} onClick={handleApplyCoupon}>
          Apply Coupon
        </button>
      </div>

      <button className={styles.placeOrderBtn} onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
      </div>
    </div>
  );
}
