// src/context/AppContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [likes, setLikes] = useState({
    flash: [],
    selling: [],
    explore: [],
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLike = (section, productId) => {
    setLikes((prev) => ({
    ...prev,
    [section]: prev[section].includes(productId)
        ? prev[section].filter((id) => id !== productId)
        : [...prev[section], productId],
    }));
  };

  const handleCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

   const updateQuantity = (id, qty) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{ cart, likes, handleLike, handleCart,updateQuantity,clearCart }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
