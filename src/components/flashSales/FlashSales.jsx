import React from "react";
import Countdown from "react-countdown";
import styles from "./FlashSales.module.css";
import flashProducts from "../data/flashProduct";

function FlashSales() {
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className={styles.flashSales}>
        <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Today's</h3>
        </div>

        <div className={styles.mainHeader}>
          <h2>Flash Sales</h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
            className={styles.countdown}
          >
            <div>
              <div>{String(days).padStart(2, "0")}</div>
              <span>Days</span>
            </div>
            <div className={styles.dots}>:</div>
            <div>
              <div>{String(hours).padStart(2, "0")}</div>
              <span>Hours</span>
            </div>
            <div className={styles.dots}>:</div>
            <div>
              <div>{String(minutes).padStart(2, "0")}</div>
              <span>Minutes</span>
            </div>
            <div className={styles.dots}>:</div>
            <div>
              <div>{String(seconds).padStart(2, "0")}</div>
              <span>Seconds</span>
            </div>
          </div>
          <div className={styles.arrows}>
            <i class="fa-solid fa-arrow-left"></i>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <div className={styles.mainContainer}>
         {flashProducts.map((product)=>(
            <div className={styles.card} key={product.id}>
                <div className={styles.imagContainer}>
                    <img src={product.img} alt={product.name}/>
                    <div className={styles.discount}>{product.discount}</div>
                    <div className={styles.seeLove}>
                        <i className="fa-solid fa-heart"></i>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                </div>
                <div className={styles.cardBody}>
                    <h4>{product.name}</h4>
                    <div className={styles.prices}>
                        <span className={styles.price}>{product.price}</span>
                        <span className={styles.prevPrice}>{product.prevPrice}</span>
                    </div>
                    <div className={styles.stars}>
                            {product.stars}
                            ({product.rate})
                    </div>
                </div>
            </div>
         ))}
        </div>
        <button className={styles.btn}>
            View All Products
        </button>
      </div>
    );
  };

  return (
    <Countdown
      date={Date.now() + 1000 * 60 * 60 * 24 * 3} // بعد 3 أيام
      renderer={renderer}
    />
  );
}

export default FlashSales;
