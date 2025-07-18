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
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";
import Compare from "./pages/Compare";
import Navbar from "./components/Navbar";
import LiveChat from "./components/LiveChat";
import { useSelector, useDispatch } from "react-redux";
import { isUserAuthenticated } from "./utils/auth";
import { connectChat } from "./redux/chat/actions";

const queryClient = new QueryClient();

const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }
  
  return <Navbar />;
};

const PrivateRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();

  if (authState?.isAuthenticated || isUserAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

// Component to initialize chat connection
const ChatInitializer = () => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(connectChat());
  }, [dispatch]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <ChatInitializer />
          <ConditionalNavbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/index" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/category/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/order/:orderId"
              element={
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              }
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
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
            <Route path="/compare" element={<Compare />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <LiveChat />
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
