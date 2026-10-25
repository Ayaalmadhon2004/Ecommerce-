// src/context/AppContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [likes, setLikes] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("likes"));
      return saved || { flash: [], selling: [], explore: [] };
    } catch {
      return { flash: [], selling: [], explore: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const handleLike = (section, productId) => {
    setLikes((prev) => ({
      ...prev,
      [section]: prev[section].includes(productId)
        ? prev[section].filter((id) => id !== productId)
        : [...prev[section], productId],
    }));
  };

  const handleCart = (product) => {
    setCart((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }]
    );
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider value={{
        cart,
        cartCount,
        likes,
        handleLike,
        handleCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
