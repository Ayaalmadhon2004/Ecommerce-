import styles from "./exploreProducts.module.css";
import { useState, useEffect } from "react";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import QuickView from "../QuickView/QuickView";

function ExploreProducts({ liked, handleLike, handleCart, handleProductDetails }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { trackRef, edges, scrollTrack, updateEdges } = useHorizontalScroll([products]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.exploreProducts}>
      <div className={styles.topHeader}>
        <div className={styles.rectangle}></div>
        <h3>Our Products</h3>
      </div>

      <div className={styles.mainHeader}>
        <h2>Explore Our Products</h2>
        <div className={styles.arrows}>
          <i
              className={`fa-solid fa-arrow-left ${edges.start ? styles.arrowDisabled : ""}`}
              role="button"
              aria-label="Scroll left"
              aria-disabled={edges.start}
              onClick={() => scrollTrack(-1)}
            ></i>
            <i
              className={`fa-solid fa-arrow-right ${edges.end ? styles.arrowDisabled : ""}`}
              role="button"
              aria-label="Scroll right"
              aria-disabled={edges.end}
              onClick={() => scrollTrack(1)}
            ></i>
          </div>
      </div>

      <div className={styles.mainContainer} ref={trackRef} onScroll={updateEdges}>
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
                      : styles.notLiked
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(product.id);
                  }}
                ></i>
                <i
                  className="fa-solid fa-eye"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                ></i>
              </div>
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

      <QuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        handleCart={handleCart}
      />
    </div>
  );
}

export default ExploreProducts;
