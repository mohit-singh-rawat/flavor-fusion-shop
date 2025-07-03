import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Likes from "./pages/Likes";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();

  if (authState.isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/index" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/likes"
              element={
                <PrivateRoute>
                  <Likes />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
