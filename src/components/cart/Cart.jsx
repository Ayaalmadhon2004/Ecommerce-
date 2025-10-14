import { useEffect, useState } from "react";
import styles from "./cart.module.css";

function Cart({ cart: initialCart }) {

  const [cart, setCart] = useState(() =>
    initialCart.map(item => ({
      ...item,
      // Ensure price is a string with $ if needed
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

  const handleQuantityChange = (id, qty) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // Calculate subtotal safely
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
    <div className={styles.cartContainer}>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {filteredCart.length === 0 ? (
            <tr>
              <td colSpan="4">Your cart is empty</td>
            </tr>
          ) : (
            filteredCart.map(item => {
              const price = parseFloat(
                (item.price != null ? item.price.toString() : "0").replace(
                  "$",
                  ""
                )
              ) || 0;
              return (
                <tr key={item.id}>
                  <td className={styles.productInfo}>
                    <img
                      src={item.image|| "/assets/default.png"}
                      alt={item.title}
                      className={styles.productImg}
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <select
                      value={item.quantity}
                      className={styles.quantitySelect}
                      onChange={e =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(q => (
                      <option key={q} value={q}>
                      {q.toString().padStart(2, "0")}
                      </option>
                      ))}
                    </select>
                  </td>
                  <td>${(price * item.quantity).toFixed(2)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className={styles.btns}>
        <button className={styles.btn}>Back to shop</button>
        <button className={styles.btn}>Update Cart</button>
        <button className={styles.btn} onClick={() => { setCart([]);               // تحديث الـ state وإفراغ الكارت
      localStorage.removeItem("cart"); // حذف من localStorage
      }}
      >
      Clear Cart
      </button>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.couponSection}>
          <input
            type="text"
            placeholder="Coupon Code"
            className={styles.couponInput}
          />
          <button className={styles.applyBtn}>Apply Coupon</button>
        </div>

        <div className={styles.cartTotalBox}>
          <h3>Cart Total</h3>
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
          <button className={styles.checkoutBtn}>Proceed to checkout</button>
        </div>
      </div>

    </div>
  );
}

export default Cart;
