import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import styles from "./searchResults.module.css";

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
      <h2>Search results for "{params.get("q")}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className={styles.grid}>
          {results.map((product) => (
            <div
              key={product.id}
              className={styles.card}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
