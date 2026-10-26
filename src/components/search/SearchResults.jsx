import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { motion } from "framer-motion";
import styles from "./searchResults.module.css";
import Reveal from "../animations/Reveal";
import { cardVariants, cardViewport } from "../animations/variants";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim().toLowerCase();
  const navigate = useNavigate();
  const { handleCart } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const results = products.filter((p) =>
    [p.title, p.category, p.description].some((field) =>
      field?.toLowerCase().includes(query)
    )
  );

  return (
    <div className={styles.search}>
      <Reveal as="h2">Search results for "{params.get("q")}"</Reveal>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className={styles.grid}>
          {results.map((product, index) => (
            <motion.div
              key={product.id}
              className={styles.card}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={cardViewport}
              onClick={() => navigate("/productDetails", { state: { product } })}
            >
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCart(product);
                }}
              >
                Add To Cart
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
