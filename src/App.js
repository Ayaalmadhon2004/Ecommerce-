// src/App.js
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { useApp } from "./context/AppContext";
import "./App.css";

import TopHeader from "./components/TopHeaders/TopHeader.jsx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";
import MainHeader from "./components/main-header/MainHeader.jsx";
import FlashSales from "./components/flashSales/FlashSales";
import Categories from "./components/categories/Categories.jsx";
import SellingProducts from "./components/sellingProducts/SellingProducts.jsx";
import MusicExperience from "./components/MusicExperience/MusicExperience";
import ExploreProducts from "./components/exploreProducts/ExploreProducts.jsx";
import NewArrival from "./components/newArrival/NewArrival.jsx";
import Services from "./components/services/Services.jsx";

import Cart from "./components/cart/Cart.jsx";
import Login from "./components/login/Login.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";


function HeaderWithLikes() {
  const { likes } = useApp();
  const likedCount = likes.flash.length + likes.selling.length + likes.explore.length;
  return <Header likedCount={likedCount} />;
} 

function Home() {
  const navigate = useNavigate();
  const { likes, handleLike, handleCart } = useApp();
  const handleProductDetails = (product) => {
    navigate("/productDetails", { state: { product } });
};

  return (
    <>
      <MainHeader />
      <FlashSales
        liked={likes.flash}
        handleLike={(id) => handleLike("flash", id)}
        handleCart={handleCart}
        handleProductDetails={handleProductDetails}
      />
      <Categories />
      <SellingProducts
        liked={likes.selling}
        handleLike={(id) => handleLike("selling", id)}
        handleCart={handleCart}
        handleProductDetails={handleProductDetails}
      />
      <MusicExperience />
      <ExploreProducts
        liked={likes.explore}
        handleLike={(id) => handleLike("explore", id)}
        handleProductDetails={handleProductDetails}
      />
      <NewArrival />
      <Services />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <TopHeader />
          <HeaderWithLikes />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/productDetails" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
