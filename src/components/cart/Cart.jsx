import { useEffect, useState } from "react";
import styles from "./cart.module.css";

function Cart({ cart: initialCart }) {
  const [cart, setCart] = useState(() => {
    // حماية من عناصر غير صالحة
    return initialCart.map(item => ({
      ...item,
      price: item.price || "$0",
      quantity: item.quantity || 1,
    }));
  });

  // تحديث localStorage عند أي تغيير في الكارت
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

  const subtotal = cart.reduce(
    (acc, item) => acc + parseInt(item.price.replace("$", "")) * item.quantity,
    0
  );

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
          {cart.filter(item => item.price && parseInt(item.price.replace("$", "")) > 0).length === 0 ? (
          <tr>
          <td colSpan="4">Your cart is empty</td>
          </tr>
          ) : (
          cart
          .filter(item => item.price && parseInt(item.price.replace("$", "")) > 0)
          .map(item => (
        <tr key={item.id}>
          <td className={styles.productInfo}>
            <img src={item.img} alt={item.name} className={styles.productImg} />
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
              {[1, 2, 3, 4, 5].map(q => (
                <option key={q} value={q}>{q.toString().padStart(2, "0")}</option>
              ))}
            </select>
          </td>
          <td>${parseInt(item.price.replace("$", "")) * item.quantity}</td>
        </tr>
        ))
        )}
        </tbody>

      </table>

      <div className={styles.btns}>
        <button className={styles.btn}>Back to shop</button>
        <button className={styles.btn}>Update Cart</button>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.couponSection}>
          <input type="text" placeholder="Coupon Code" className={styles.couponInput} />
          <button className={styles.applyBtn}>Apply Coupon</button>
        </div>

        <div className={styles.cartTotalBox}>
          <h3>Cart Total</h3>
          <div className={styles.cartTotalRow}>
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className={styles.cartTotalRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className={styles.cartTotalRow}>
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button className={styles.checkoutBtn}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
