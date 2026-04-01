// ─── Cart Context ────────────────────────────────────────────────
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('sv_cart') || '[]'));

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('sv_cart', JSON.stringify(items));
  }, [items]);

  // Add item or increase quantity
  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        toast.success(`${product.name} quantity updated! 🛒`);
        return prev.map((i) => i._id === product._id ? { ...i, quantity: i.quantity + qty } : i);
      }
      toast.success(`${product.name} added to cart! 🛒`);
      return [...prev, { ...product, quantity: qty }];
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
    toast.error('Item removed from cart.');
  };

  // Update quantity directly
  const updateQuantity = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => i._id === id ? { ...i, quantity: qty } : i));
  };

  // Clear entire cart
  const clearCart = () => setItems([]);

  // Derived values
  const totalItems    = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal      = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const isEmpty       = items.length === 0;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal, isEmpty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);