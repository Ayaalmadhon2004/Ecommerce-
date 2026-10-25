import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import styles from "./shop.module.css";

const CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

function Shop() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { likes, handleLike, handleCart } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const category = searchParams.get("category");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching products", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const visible = category
    ? products.filter((p) => p.category === category)
    : products;

  const selectCategory = (value) => {
    if (value) setSearchParams({ category: value });
    else setSearchParams({});
  };

  const openDetails = (product) =>
    navigate("/productDetails", { state: { product } });

  return (
    <div className={styles.shop}>
      <h2 className={styles.title}>Shop</h2>

      <div className={styles.chips}>
        <button
          className={`${styles.chip} ${!category ? styles.active : ""}`}
          onClick={() => selectCategory(null)}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`${styles.chip} ${category === c ? styles.active : ""}`}
            onClick={() => selectCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className={styles.message}>Loading products...</p>}
      {!loading && error && (
        <p className={styles.message}>Could not load products. Please try again later.</p>
      )}
      {!loading && !error && visible.length === 0 && (
        <div className={styles.message}>
          <p>No products found{category ? ` in "${category}"` : ""}.</p>
          {category && (
            <button className={styles.chip} onClick={() => selectCategory(null)}>
              View all products
            </button>
          )}
        </div>
      )}

      <div className={styles.grid}>
        {visible.map((product) => (
          <div
            className={styles.card}
            key={product.id}
            onClick={() => openDetails(product)}
          >
            <div className={styles.imageBox}>
              <img src={product.img || product.image} alt={product.title} />
              <i
                className={`fa-solid fa-heart ${styles.heart} ${
                  likes.selling.includes(product.id) ? styles.liked : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike("selling", product.id);
                }}
              ></i>
              <button
                className={styles.addToCart}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCart(product);
                }}
              >
                Add To Cart
              </button>
            </div>
            <div className={styles.body}>
              <h4>{product.title}</h4>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.category}>{product.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
