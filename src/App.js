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
  const [liked, setLiked] = useState([]); // الحالة المشتركة
  const [likeSelling,setLikeSelling]=useState([]);
  const [likeExploreing,setLikeExploring]=useState([]);

  const handleLike = (productId) => {
    setLiked((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLikeSelling = (productId) =>{
    setLikeSelling((prev)=>
    prev.includes(productId) ? 
  prev.filter((id)=> id !==productId) : [...prev,productId]);
  };

  const handleLikeExploring = (productId)=>{
    setLikeExploring((prev)=>
    prev.includes(productId) ? prev.filter((id)=>id!==productId) : [...prev,productId]);
  }

  return (
    <div className="App">
      <TopHeader/>
      <Header likedCount={liked.length + likeSelling.length +likeExploreing.length}/>
      <MainHeader/>
      <FlashSales liked={liked} handleLike={handleLike}/>
      <Categories/>
      <SellingProducts  liked={likeSelling} handleLike={handleLikeSelling} />
      <MusicExperience/>
      <ExploreProducts liked={likeExploreing} handleLike={handleLikeExploring}/>
      <NewArrival/>
      <Services/>
      <Footer/>
    </div>
  );
}

export default App;
