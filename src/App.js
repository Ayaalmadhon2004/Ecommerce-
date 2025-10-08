import { useState } from 'react';
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

function App() {
  const [likes, setLikes] = useState({
  flash: [],
  selling: [],
  explore: [],
  });

  const handleLike = (section, productId) => {
  setLikes(prev => ({
    ...prev,
    [section]: prev[section].includes(productId)
      ? prev[section].filter(id => id !== productId)
      : [...prev[section], productId]
  }));
};


  return (
    <div className="App">
      <TopHeader/>
      <Header likedCount={likes.flash.length + likes.selling.length + likes.explore.length}/>
      <MainHeader/>
      <FlashSales liked={likes.flash} handleLike={id => handleLike('flash', id)}/>
      <Categories/>
      <SellingProducts liked={likes.selling} handleLike={id => handleLike('selling', id)}/>
      <MusicExperience/>
      <ExploreProducts liked={likes.explore} handleLike={id => handleLike('explore', id)}/>
      <NewArrival/>
      <Services/>
      <Footer/>
    </div>
  );
}

export default App;
