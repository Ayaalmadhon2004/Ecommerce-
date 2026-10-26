// src/App.js
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { useApp } from "./context/AppContext";
import { LanguageProvider } from "./i18n/LanguageContext";
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
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import SearchResults from "./components/search/SearchResults.jsx";
import Wishlist from "./components/wishlist/Wishlist.jsx";
import PageTransition from "./components/animations/PageTransition.jsx";
import Shop from "./components/shop/Shop.jsx";
import InfoPage from "./components/legal/InfoPage.jsx";

const LOREM = "This is placeholder content and will be replaced with the final text.";


function HeaderWithLikes() {
  const { likes } = useApp();
  const likedCount = likes.flash.length + likes.selling.length + likes.explore.length;
  return <Header likedCount={likedCount} />;
} 

function NotFound() {
  return (
    <div className="notFound">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
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
        handleCart={handleCart}
        handleProductDetails={handleProductDetails}
      />
      <NewArrival />
      <Services />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<InfoPage title="Privacy Policy" paragraphs={[LOREM, LOREM]} />} />
          <Route path="/terms" element={<InfoPage title="Terms Of Use" paragraphs={[LOREM, LOREM]} />} />
          <Route path="/faq" element={<InfoPage title="FAQ" paragraphs={[LOREM, LOREM]} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <TopHeader />
          <HeaderWithLikes />
          <AnimatedRoutes />
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}
