// src/components/wishlist/Wishlist.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import styles from "./wishlist.module.css";

const SECTIONS = [
  { key: "flash", title: "Flash Sales" },
  { key: "selling", title: "Best Selling Products" },
  { key: "explore", title: "Explore Our Products" },
];

export default function Wishlist() {
  const navigate = useNavigate();
  const { likes, handleLike, handleCart } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching products", err))
      .finally(() => setLoading(false));
  }, []);

  const groups = SECTIONS.map((section) => ({
    ...section,
    items: products.filter((p) => likes[section.key]?.includes(p.id)),
  })).filter((group) => group.items.length > 0);

  const likedCount = SECTIONS.reduce(
    (sum, s) => sum + (likes[s.key]?.length || 0),
    0
  );

  return (
    <div className={styles.wishlist}>
      <div className={styles.topHeader}>
        <div className={styles.rectangle}></div>
        <h3>Wishlist ({likedCount})</h3>
      </div>

      {loading && likedCount > 0 && <p>Loading your favorites...</p>}

      {!loading && groups.length === 0 && (
        <div className={styles.empty}>
          <p>Your wishlist is empty</p>
          <Link to="/" className={styles.btn}>
            Back to shop
          </Link>
        </div>
      )}

      {groups.map((group) => (
        <section key={group.key} className={styles.section}>
          <h2>
            {group.title} ({group.items.length})
          </h2>
          <div className={styles.grid}>
            {group.items.map((product) => (
              <div
                className={styles.card}
                key={product.id}
                onClick={() =>
                  navigate("/productDetails", { state: { product } })
                }
              >
                <div className={styles.imagContainer}>
                  <img src={product.image} alt={product.title} />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    aria-label={`Remove ${product.title} from wishlist`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(group.key, product.id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    type="button"
                    className={styles.addToCart}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCart(product);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
                <div className={styles.cardBody}>
                  <h4>{product.title}</h4>
                  <span className={styles.price}>${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
