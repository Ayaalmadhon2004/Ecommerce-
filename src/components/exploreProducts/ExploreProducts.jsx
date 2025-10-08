import styles from "./exploreProducts.module.css"
import exploreProducts from "../data/exploreProducts"
import { useState } from "react"

function ExploreProducts({liked,handleLike}) {
  const [chosenColors,setChosen]=useState(true);

  const handleChooseColor = (productId,color)=>{
    setChosen((prev)=>({
      ...prev,
      [productId]: color,
    }))
  }
  return (
    <div className={styles.exploreProducts}>
        <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>Our Products</h3>
        </div>
         <div className={styles.mainHeader}>
          <h2>Explore Our Products</h2>
           <div className={styles.arrows}>
            <i class="fa-solid fa-arrow-left"></i>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className={styles.mainContainer}>
         {exploreProducts.map((product)=>(
            <div className={styles.card} key={product.id}>
                <div className={styles.imagContainer}>
                    <img src={product.img} alt={product.name}/>
                    {product.discount?<div className={styles.discount}>{product.discount}</div>:""}
                    <div className={styles.seeLove}>
                        <i className={`fa-solid fa-heart ${liked.includes(product.id)?styles.liked:styles.notLike}`} onClick={()=>handleLike(product.id)}></i>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                    <button className={styles.addToCart}>Add To Cart</button>
                </div>
                <div className={styles.cardBody}>
                    <h4>{product.name}</h4>
                    <div className={styles.stars}>
                          <span className={styles.price}>{product.price}</span>
                          {product.stars}
                          ({product.rate})
                    </div>
                   {/* Color Selection */}
              {product.btn1?<div className={styles.setColor}>
                <div
                  style={{
                    backgroundColor: product.btn1,
                    border:
                      chosenColors[product.id] === product.btn1
                        ? "3px solid black"
                        : "1px solid #ccc",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                    transition: "all 0.2s",
                  }}
                  onClick={() => handleChooseColor(product.id, product.btn1)}
                ></div>

                <div
                  style={{
                    backgroundColor: product.btn2,
                    border:
                      chosenColors[product.id] === product.btn2
                        ? "3px solid black"
                        : "1px solid #ccc",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                    transition: "all 0.2s",
                  }}
                  onClick={() => handleChooseColor(product.id, product.btn2)}
                ></div>
              </div>:""}
            </div>
            </div>
         ))}
        </div>
        <button className={styles.btn}>
            View All Products
        </button>

    </div>
  )
}

export default ExploreProducts
