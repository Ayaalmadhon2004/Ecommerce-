/*import React, { useState } from "react";
import Countdown from "react-countdown";
import styles from "./FlashSales.module.css";
import flashProducts from "../data/flashProduct";

function FlashSales({liked,handleLike,handleCart}) {
  const[clickedId,setClickedId]=useState(null);


  const renderer = ({ days, hours, minutes, seconds }) => {

    const handleClick = (productId) => {
    if (clickedId === productId) {
    setClickedId(null); 
    } else {
    setClickedId(productId); 
    }
    };


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
            <i className="fa-solid fa-arrow-left"></i>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className={styles.mainContainer}>
         {flashProducts.map((product)=>(
            <div className={styles.card} key={product.id}>
                <div className={styles.imagContainer}>
                    <img src={product.img} alt={product.name}/>
                    <div className={styles.discount}>{product.discount}</div>
                    <div className={styles.seeLove}>

                        <i className={`fa-solid fa-heart ${
                          liked.includes(product.id) ? styles.liked : styles.notLiked
                        }`} onClick={()=>handleLike(product.id)}></i>

                        <i className="fa-solid fa-eye" onClick={()=>handleClick(product.id)}></i>
                    </div>
                    <button className={styles.addToCart} onClick={()=>handleCart(product)}>Add To Cart</button>
                </div>
                <div className={styles.cardBody}>
                    <h4>{product.name}</h4>
                    <div className={styles.prices}>
                        <span className={styles.price}>{product.price}</span>
                        <span className={styles.prevPrice}>{product.prevPrice}</span>
                    </div>
                    <div className={styles.stars}>
                            <Stars count={product.stars} />
                            ({product.rate})
                    </div>
                </div>
                {clickedId === product.id && (
                  <div className={styles.cart}>
                    <div className={styles.leftCart}>
                      <img src={product.img} alt={product.name}/>
                    </div>
                    <div className={styles.rightCart}>
                      <div className={styles.hedding}>
                        <h4>{product.name}</h4>
                        <i className="fa-solid fa-xmark" onClick={() => setClickedId(null)}></i>
                      </div>
                        <div className={styles.stars}>
                            <Stars count={product.stars} />
                            ({product.rate})
                        </div>
                      <span className={styles.price}>{product.price}</span>
                      <p>{product.description}</p>
                      <button className={styles.btn}>Buy Now</button>
                    </div>
                  </div>
                )}
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

export default FlashSales;*/
import React, { useState, useEffect, useRef, useCallback } from "react";
import Countdown from "react-countdown";
import styles from "./FlashSales.module.css";
import Stars from "../Stars/Stars";

function FlashSales({ liked, handleLike, handleCart ,  handleProductDetails }) {
  const [clickedId, setClickedId] = useState(null);
  const [flashProducts, setFlashProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 1;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setEdges((prev) =>
      prev.start === start && prev.end === end ? prev : { start, end }
    );
  }, []);

  const scrollTrack = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges, loading, flashProducts]);

  // جلب المنتجات من FakeStore API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5") // نحدد 5 منتجات كـ flash sales
      .then((res) => res.json())
      .then((data) => {
        // إضافة خصائص إضافية مثل discount و stars و prevPrice لتتناسب مع التصميم
        const updatedData = data.map((product) => ({
          ...product,
          discount: `${Math.floor(Math.random() * 50) + 10}% OFF`,
          prevPrice: `$${(product.price * 1.2).toFixed(2)}`,
          stars: 4,
          rate: product.rating?.rate || 4,
          description: product.description,
        }));
        setFlashProducts(updatedData);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => {
    const handleClick = (productId) => {
      if (clickedId === productId) {
        setClickedId(null);
      } else {
        setClickedId(productId);
      }
    };

    if (loading) return <p>Loading Flash Sales...</p>;

    return (
      <div className={styles.flashSales} >
        <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Today's</h3>
        </div>

        <div className={styles.mainHeader}>
          <h2>Flash Sales</h2>
          <div
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
          {flashProducts.map((product) => (
            <div className={styles.card} key={product.id} onClick={() => handleProductDetails(product)}>
              <div className={styles.imagContainer}>
                <img src={product.image} alt={product.title} />
                <div className={styles.discount}>{product.discount}</div>
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
                      handleClick(product.id);
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
                <div className={styles.prices}>
                  <span className={styles.price}>${product.price}</span>
                  <span className={styles.prevPrice}>{product.prevPrice}</span>
                </div>
                <div className={styles.stars}>
                  <Stars count={product.stars} /> ({product.rate})
                </div>
              </div>

              {clickedId === product.id && (
                <div className={styles.cart} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.leftCart}>
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className={styles.rightCart}>
                    <div className={styles.hedding}>
                      <h4>{product.title}</h4>
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => setClickedId(null)}
                      ></i>
                    </div>
                    <div className={styles.stars}>
                      <Stars count={product.stars} /> ({product.rate})
                    </div>
                    <span className={styles.price}>${product.price}</span>
                    <p>{product.description}</p>
                    <button className={styles.btn}>Buy Now</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className={styles.btn}>View All Products</button>
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

