import React, { createContext, useContext, useState, useEffect } from 'react';
import { isUserAuthenticated } from '../utils/auth';
import { useSelector } from 'react-redux';

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const authState = useSelector((state) => state.auth);
  
  // Get user-specific wishlist key
  const getWishlistKey = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user._id ? `wishlistItems_${user._id}` : 'wishlistItems_guest';
  };

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const wishlistKey = getWishlistKey();
    const savedWishlist = localStorage.getItem(wishlistKey);
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, [authState.isAuthenticated]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    const wishlistKey = getWishlistKey();
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  // Handle login - merge guest wishlist with user wishlist
  useEffect(() => {
    if (authState.isAuthenticated) {
      const guestWishlist = JSON.parse(localStorage.getItem('wishlistItems_guest') || '[]');
      const userWishlistKey = getWishlistKey();
      const userWishlist = JSON.parse(localStorage.getItem(userWishlistKey) || '[]');
      
      // Merge guest wishlist with user wishlist
      if (guestWishlist.length > 0) {
        const mergedWishlist = [...userWishlist];
        guestWishlist.forEach(guestItem => {
          const exists = mergedWishlist.find(item => item.id === guestItem.id);
          if (!exists) {
            mergedWishlist.push(guestItem);
          }
        });
        setWishlistItems(mergedWishlist);
        localStorage.removeItem('wishlistItems_guest'); // Clear guest wishlist
      }
    }
  }, [authState.isAuthenticated]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id);
      if (!exists) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
