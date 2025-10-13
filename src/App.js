import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
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

 const handleCart = (product) => {
  const exists = cart.find(item => item.id === product.id);

  if (exists) {
    // لو المنتج موجود مسبقاً، نزود العدد بدل الإضافة مرة تانية
    setCart(cart.map(item => 
      item.id === product.id ? {...item, quantity: item.quantity + 1} : item
    ));
  } else {
    setCart([...cart, {...product, quantity: 1}]);
  }
};



  console.log(cart);

  return (
    <Router>
      <div className="App">
        <TopHeader />
        <Header likedCount={likes.flash.length + likes.selling.length + likes.explore.length} />

        <Routes>
          {/* الصفحة الرئيسية */}
          <Route
            path="/"
            element={
              <>
                <MainHeader />
                <FlashSales liked={likes.flash} handleLike={id => handleLike('flash', id)} handleCart={handleCart} />
                <Categories />
                <SellingProducts liked={likes.selling} handleLike={id => handleLike('selling', id)} />
                <MusicExperience />
                <ExploreProducts liked={likes.explore} handleLike={id => handleLike('explore', id)} />
                <NewArrival />
                <Services />
              </>
            }
          />

          {/* صفحة السلة */}
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/logIn" element={<Login/>}/>
          <Route path="/" element={App}></Route>
        </Routes>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
