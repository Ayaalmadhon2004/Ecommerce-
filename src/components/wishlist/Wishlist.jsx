// src/components/wishlist/Wishlist.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./wishlist.module.css";
import Reveal from "../animations/Reveal";
import { cardVariants, cardImageVariants, fadeUp } from "../animations/variants";

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
      <Reveal className={styles.topHeader}>
        <div className={styles.rectangle}></div>
        <h3>Wishlist ({likedCount})</h3>
      </Reveal>

      {loading && likedCount > 0 && <p>Loading your favorites...</p>}

      {!loading && groups.length === 0 && (
        <motion.div
          className={styles.empty}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p>Your wishlist is empty</p>
          <Link to="/" className={styles.btn}>
            Back to shop
          </Link>
        </motion.div>
      )}

      <AnimatePresence>
      {groups.map((group) => (
        <motion.section
          key={group.key}
          className={styles.section}
          layout
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <h2>
            {group.title} ({group.items.length})
          </h2>
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
            {group.items.map((product, index) => (
              <motion.div
                className={styles.card}
                key={product.id}
                layout
                variants={cardVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                onClick={() =>
                  navigate("/productDetails", { state: { product } })
                }
              >
                <div className={styles.imagContainer}>
                  <motion.img variants={cardImageVariants} src={product.image} alt={product.title} />
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
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </motion.section>
      ))}
      </AnimatePresence>
    </div>
  );
}
