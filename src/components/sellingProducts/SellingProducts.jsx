import styles from "./sellingProducts.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickView from "../QuickView/QuickView";
import { motion } from "framer-motion";
import Reveal from "../animations/Reveal";
import MotionHeart from "../animations/MotionHeart";
import { cardVariants, cardImageVariants, cardViewport } from "../animations/variants";

function SellingProducts({liked,handleLike,handleCart,handleProductDetails,varient}) {
  const navigate=useNavigate();
  const [products,setProducts]=useState([]);
  const [selectedProduct,setSelectedProduct]=useState(null);

  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then((data)=>setProducts(data))
    .catch((err)=>console.error("Error fetching products",err));
  },[]);

  return (
    <div className={styles.sellingProducts}>
         <Reveal className={styles.topHeader}>
          <div className={styles.rectangle}></div>
          <h3>{varient==='related'?"Related Item":"This month"}</h3>
        </Reveal>
        <Reveal className={styles.mainHeader}>
          <h2>{varient==="related"?" " :"Best Selling Products"}</h2>
           {varient === "related" ? (null) : <button className={styles.btn} onClick={()=>navigate("/shop")}>View All</button> }
        </Reveal>
         <div className={styles.mainContainer}>
         {products.map((product,index)=>(
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
                    <motion.img variants={cardImageVariants} src={product.image} alt={product.title}/>
                    <div className={styles.discount}>{product.discount}</div>
                    <div className={styles.seeLove}>
                        <MotionHeart isLiked={liked.includes(product.id)} likedClass={styles.liked} notLikedClass={styles.notLiked} onClick={(e)=>{ e.stopPropagation(); handleLike(product.id); }} />
                        <i className="fa-solid fa-eye" onClick={(e)=>{ e.stopPropagation(); setSelectedProduct(product); }}></i>
                    </div>
                    <button
                        className={styles.addToCart}
                        onClick={(e) => { e.stopPropagation(); handleCart?.(product); }}
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
            </motion.div>
         ))}
        </div>
        <QuickView
          product={selectedProduct}
          onClose={()=>setSelectedProduct(null)}
          handleCart={handleCart}
        />
    </div>
  )
}

export default SellingProducts
