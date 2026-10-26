import { useState } from "react";
import { useApp, COUPONS } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./checkout.module.css";
import AnimatedNumber from "../animations/AnimatedNumber";
import { fadeUp, scaleIn, slideLeft, slideRight } from "../animations/variants";

const money = (n) => `$${n.toFixed(2)}`;

const parsePrice = value =>
  parseFloat(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;

const BILLING_KEY = "billingInfo";
const EMPTY_BILLING = {
  firstName: "",
  companyName: "",
  streetName: "",
  apartment: "",
  townCity: "",
  phoneNumber: "",
  email: "",
};

const loadBilling = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(BILLING_KEY));
    return saved ? { ...EMPTY_BILLING, ...saved } : EMPTY_BILLING;
  } catch {
    return EMPTY_BILLING;
  }
};

export default function Checkout() {
    const { cart, clearCart, appliedCode, applyCoupon, clearCoupon } = useApp();
    const [paymentMethod, setPaymentMethod] = useState("bank");
    const [coupon, setCoupon] = useState("");

    const subtotal = cart.reduce(
      (acc, item) => acc + parsePrice(item.price) * (item.quantity || 1),
      0
    );
    const discount = appliedCode ? subtotal * COUPONS[appliedCode] : 0;
    const total = subtotal - discount;

    const handleCouponChange = e => setCoupon(e.target.value);

    const [couponError, setCouponError] = useState("");

    const handleApplyCoupon = () => {
      setCouponError(applyCoupon(coupon) ? "" : "Invalid coupon code");
    };

    const [billing, setBilling] = useState(loadBilling);
    const [saveInfo, setSaveInfo] = useState(() => {
      try {
        return localStorage.getItem(BILLING_KEY) !== null;
      } catch {
        return false;
      }
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [confirmation, setConfirmation] = useState(null);

    const handleBillingChange = e => {
      const { name, value } = e.target;
      setBilling(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveInfoChange = e => {
      const checked = e.target.checked;
      setSaveInfo(checked);
      if (!checked) {
        try {
          localStorage.removeItem(BILLING_KEY);
        } catch {
          /* storage unavailable */
        }
      }
    };

    const handlePlaceOrder = e => {
      e.preventDefault();
      if (cart.length === 0) return;
      if (saveInfo) {
        try {
          localStorage.setItem(BILLING_KEY, JSON.stringify(billing));
        } catch {
          /* storage unavailable */
        }
      }
      setConfirmation({
        firstName: billing.firstName,
        address: [billing.streetName, billing.apartment, billing.townCity]
          .map(part => part.trim())
          .filter(Boolean)
          .join(", "),
        paymentMethod,
        total,
      });
      clearCart();
      clearCoupon();
      setOrderPlaced(true);
    };

  if (orderPlaced) {
    return (
      <div className={styles.checkout}>
        <motion.div
          className={styles.left}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <h2>Thank you!</h2>
          <p>
            Thank you{confirmation?.firstName ? `, ${confirmation.firstName}` : ""}!
            Your order has been placed.
          </p>
          {confirmation?.address && <p>Shipping to: {confirmation.address}</p>}
          <p>
            Payment method:{" "}
            {confirmation?.paymentMethod === "bank" ? "Bank" : "Cash on delivery"}
          </p>
          <p>Total: ${(confirmation?.total ?? 0).toFixed(2)}</p>
          <p>A confirmation will be sent to your email.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <motion.div
        className={styles.left}
        variants={slideRight}
        initial="hidden"
        animate="visible"
      >
        <h2>Billing Details</h2>
        <form id="checkout-form" className={styles.form} onSubmit={handlePlaceOrder}>
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" type="text" name="firstName" value={billing.firstName} onChange={handleBillingChange} required />

          <label htmlFor="company-name">Company Name</label>
          <input id="company-name" type="text" name="companyName" value={billing.companyName} onChange={handleBillingChange} />

          <label htmlFor="street-name">Street Name</label>
          <input id="street-name" type="text" name="streetName" value={billing.streetName} onChange={handleBillingChange} required />

          <label htmlFor="apartment">Apartment, floor, etc (optional)</label>
          <input id="apartment" type="text" name="apartment" value={billing.apartment} onChange={handleBillingChange} />

          <label htmlFor="town-city">Town/City</label>
          <input id="town-city" type="text" name="townCity" value={billing.townCity} onChange={handleBillingChange} required />

          <label htmlFor="phone-number">Phone Number</label>
          <input id="phone-number" type="tel" name="phoneNumber" value={billing.phoneNumber} onChange={handleBillingChange} required />

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" value={billing.email} onChange={handleBillingChange} required />

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="saveInfo"
              className={styles.check}
              checked={saveInfo}
              onChange={handleSaveInfoChange}
            />
            <label htmlFor="saveInfo">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
      </motion.div>

      <motion.div
        className={styles.right}
        variants={slideLeft}
        initial="hidden"
        animate="visible"
      >
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => {
            const qty = item.quantity || 1;
            const name = item.name || item.title;
            const lineTotal = parsePrice(item.price) * qty;
            return (
              <motion.div key={item.id} className={styles.cartItem} variants={fadeUp} initial="hidden" animate="visible">
                <img
                  src={item.img || item.image || "/assets/default.png"}
                  alt={name}
                  className={styles.img}
                />
                <span className={styles.name}>
                  {name} <small className={styles.qty}>x{qty}</small>
                </span>
                <span className={styles.price}>${lineTotal.toFixed(2)}</span>
              </motion.div>
            );
          })
        )}
        <div className={styles.price}>
          <div className={styles.cartTotalRow}>
          <span>Subtotal:</span>
          <span><AnimatedNumber value={subtotal} format={money} /></span>
        </div>
        {appliedCode && (
          <div className={styles.cartTotalRow}>
            <span>Discount ({appliedCode}):</span>
            <span>-<AnimatedNumber value={discount} format={money} /></span>
          </div>
        )}
        <div className={styles.cartTotalRow}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className={styles.cartTotalRow}>
          <span>Total:</span>
          <span><AnimatedNumber value={total} format={money} /></span>
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

      <motion.button
        type="submit"
        form="checkout-form"
        className={styles.placeOrderBtn}
        disabled={cart.length === 0}
        whileHover={cart.length === 0 ? undefined : { scale: 1.03 }}
        whileTap={cart.length === 0 ? undefined : { scale: 0.97 }}
      >
        Place Order
      </motion.button>
    </div>
      </motion.div>
    </div>
  );
}
