import styles from "./exploreProducts.module.css";
import { useState, useEffect } from "react";

function ExploreProducts({ liked, handleLike, handleProductDetails }) {
  const [products, setProducts] = useState([]);
  const [chosenColors, setChosen] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChooseColor = (productId, color) => {
    setChosen((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  return (
    <div className={styles.exploreProducts}>
      <div className={styles.topHeader}>
        <div className={styles.rectangle}></div>
        <h3>Our Products</h3>
      </div>

      <div className={styles.mainHeader}>
        <h2>Explore Our Products</h2>
        <div className={styles.arrows}>
          <i className="fa-solid fa-arrow-left"></i>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>

      <div className={styles.mainContainer}>
        {products.map((product) => (
          <div
            className={styles.card}
            key={product.id}
            onClick={() => handleProductDetails(product)}
          >
            <div className={styles.imagContainer}>
              <img src={product.image} alt={product.title} />
              <div className={styles.seeLove}>
                <i
                  className={`fa-solid fa-heart ${
                    liked.includes(product.id)
                      ? styles.liked
                      : styles.notLike
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(product.id);
                  }}
                ></i>
                <i
                  className="fa-solid fa-eye"
                ></i>
              </div>
              <button
                className={styles.addToCart}
                onClick={(e) => e.stopPropagation()}
              >
                Add To Cart
              </button>
            </div>

            <div className={styles.cardBody}>
              <h4>{product.title}</h4>
              <div className={styles.stars}>
                <span className={styles.price}>${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.btn}>View All Products</button>
    </div>
  );
}

export default ExploreProducts;
