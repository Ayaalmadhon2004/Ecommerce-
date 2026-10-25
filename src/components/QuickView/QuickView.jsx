import { useEffect } from "react";
import styles from "./quickView.module.css";

function QuickView({ product, onClose, handleCart }) {
  useEffect(() => {
    if (!product) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  const img = product.img || product.image;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.imageWrap}>
          <img src={img} alt={product.title} />
        </div>
        <div className={styles.details}>
          <div className={styles.heading}>
            <h4>{product.title}</h4>
            <i
              className={`fa-solid fa-xmark ${styles.close}`}
              onClick={onClose}
            ></i>
          </div>
          <span className={styles.price}>${product.price}</span>
          {product.description && <p>{product.description}</p>}
          <button
            className={styles.btn}
            onClick={() => {
              handleCart?.(product);
              onClose();
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickView;
