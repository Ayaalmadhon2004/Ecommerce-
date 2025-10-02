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
  return (
    <div className="App">
      <TopHeader/>
      <Header/>
      <MainHeader/>
      <FlashSales/>
      <Categories/>
      <SellingProducts/>
      <MusicExperience/>
      <ExploreProducts/>
      <NewArrival/>
      <Services/>
      <Footer/>
    </div>
  );
}

export default App;
