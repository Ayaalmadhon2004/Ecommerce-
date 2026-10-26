import styles from "./exploreProducts.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import QuickView from "../QuickView/QuickView";
import { motion } from "framer-motion";
import Reveal from "../animations/Reveal";
import MotionHeart from "../animations/MotionHeart";
import { cardVariants, cardImageVariants, cardViewport } from "../animations/variants";

function ExploreProducts({ liked, handleLike, handleCart, handleProductDetails }) {
  const navigate = useNavigate();
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
      <Reveal className={styles.topHeader}>
        <div className={styles.rectangle}></div>
        <h3>Our Products</h3>
      </Reveal>

      <Reveal className={styles.mainHeader}>
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
      </Reveal>

      <div className={styles.mainContainer} ref={trackRef} onScroll={updateEdges}>
        {products.map((product, index) => (
          <motion.div
            className={styles.card}
            key={product.id}
            onClick={() => handleProductDetails(product)}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={cardViewport}
          >
            <div className={styles.imagContainer}>
              <motion.img variants={cardImageVariants} src={product.image} alt={product.title} />
              <div className={styles.seeLove}>
                <MotionHeart isLiked={liked.includes(product.id)} likedClass={styles.liked} notLikedClass={styles.notLiked} onClick={(e) => {
                    e.stopPropagation();
                    handleLike(product.id);
                  }} />
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
          </motion.div>
        ))}
      </div>

      <button className={styles.btn} onClick={() => navigate("/shop")}>View All Products</button>

      <QuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        handleCart={handleCart}
      />
    </div>
  );
}

export default ExploreProducts;
