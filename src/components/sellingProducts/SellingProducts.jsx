import styles from "./sellingProducts.module.css"
import sellingProducts from "../data/sellingProducts";
import { useEffect, useState } from "react";

function SellingProducts({liked,handleLike,handleCart,handleProductDetails,varient}) {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then((data)=>setProducts(data))
    .catch((err)=>console.error("Error fetching products",err));
  },[]);

  return (
    <div className={styles.sellingProducts}>
         <div className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>{varient==='related'?"Related Item":"This month"}</h3>
        </div>
        <div className={styles.mainHeader}>
          <h2>{varient==="related"?" " :"Best Selling Products"}</h2>
           {varient === "related" ? (null) : <button className={styles.btn}>View All</button> }
        </div>
         <div className={styles.mainContainer}>
         {products.map((product)=>(
            <div className={styles.card} key={product.id} onClick={() => handleProductDetails(product)}>
                <div className={styles.imagContainer}>
                    <img src={product.image} alt={product.title}/>
                    <div className={styles.discount}>{product.discount}</div>
                    <div className={styles.seeLove}>
                        <i className={`fa-solid fa-heart ${
                          liked.includes(product.id) ? styles.liked : styles.notLiked
                        }`} onClick={()=>handleLike(product.id)}></i>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                    <button
                        className={styles.addToCart}
                        onClick={() => handleCart(product)}
                        >
                        Add To Cart
                    </button>
                </div>
                <div className={styles.cardBody}>
                    <h4>{product.title}</h4>
                    <div className={styles.prices}>
                        <span className={styles.price}>{product.price}</span>
                        <span className={styles.prevPrice}>{product.prevPrice}</span>
                    </div>
                    <div className={styles.stars}>
                        ( {product.category} )
                    </div>
                </div>
            </div>
         ))}
        </div>
    </div>
  )
}

export default SellingProducts
