import './App.css';
import Header from './components/Header/Header';
import MusicExperience from './components/MusicExperience/MusicExperience';
import TopHeader from './components/TopHeaders/TopHeader';
import Categories from './components/categories/Categories';
import FlashSales from './components/flashSales/FlashSales';
import MainHeader from "./components/main-header/MainHeader";

function App() {
  return (
    <div className="App">
      <TopHeader/>
      <Header/>
      <MainHeader/>
      <FlashSales/>
      <Categories/>
      <MusicExperience/>
    </div>
  );
}

export default App;
