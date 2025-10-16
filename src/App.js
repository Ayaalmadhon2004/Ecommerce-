import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MusicExperience from './components/MusicExperience/MusicExperience';
import TopHeader from './components/TopHeaders/TopHeader';
import Categories from './components/categories/Categories';
import ExploreProducts from './components/exploreProducts/ExploreProducts';
import FlashSales from './components/flashSales/FlashSales';
import MainHeader from "./components/main-header/MainHeader";
import NewArrival from './components/newArrival/NewArrival';
import SellingProducts from './components/sellingProducts/SellingProducts';
import Services from './components/services/Services';
import Cart from './components/cart/Cart';
import Login from './components/login/Login';
import Checkout from './components/checkout/Checkout';
import ProductDetails from './components/ProductDetails/ProductDetails';

export default function App() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [likes, setLikes] = useState({
    flash: [],
    selling: [],
    explore: [],
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLike = (section, productId) => {
    setLikes(prev => ({
      ...prev,
      [section]: prev[section].includes(productId)
        ? prev[section].filter(id => id !== productId)
        : [...prev[section], productId]
    }));
  };

  const handleProductDetails = (product) => {
    navigate('/productDetails', { state: { product } });
  };

  const handleCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  return (
    <div className="App">
      <TopHeader />
      <Header likedCount={likes.flash.length + likes.selling.length + likes.explore.length} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainHeader />
              <FlashSales 
                liked={likes.flash} 
                handleLike={id => handleLike('flash', id)} 
                handleCart={handleCart}
                handleProductDetails={handleProductDetails} 
              />
              <Categories />
              <SellingProducts 
                liked={likes.selling} 
                handleLike={id => handleLike('selling', id)} 
                handleCart={handleCart}
                handleProductDetails={handleProductDetails} 
              />
              <MusicExperience />
              <ExploreProducts 
                liked={likes.explore} 
                handleLike={id => handleLike('explore', id)} 
                handleProductDetails={handleProductDetails} 
              />
              <NewArrival />
              <Services />
            </>
          }
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/productDetails" element={<ProductDetails />} />
      </Routes>

      <Footer />
    </div>
  );
}
