import React, { createContext, useContext, useState, useEffect } from 'react';
import { isUserAuthenticated } from '../utils/auth';
import { useSelector } from 'react-redux';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const authState = useSelector((state) => state.auth);
  
  // Get user-specific cart key
  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user._id ? `cartItems_${user._id}` : 'cartItems_guest';
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [authState.isAuthenticated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Handle login - merge guest cart with user cart
  useEffect(() => {
    if (authState.isAuthenticated) {
      const guestCart = JSON.parse(localStorage.getItem('cartItems_guest') || '[]');
      const userCartKey = getCartKey();
      const userCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
      
      // Merge guest cart with user cart
      if (guestCart.length > 0) {
        const mergedCart = [...userCart];
        guestCart.forEach(guestItem => {
          const existingItem = mergedCart.find(item => item.id === guestItem.id);
          if (existingItem) {
            existingItem.quantity += guestItem.quantity;
          } else {
            mergedCart.push(guestItem);
          }
        });
        setCartItems(mergedCart);
        localStorage.removeItem('cartItems_guest'); // Clear guest cart
      }
    }
  }, [authState.isAuthenticated]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
