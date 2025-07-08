import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import '../styles/animations.css';
import { toast } from 'sonner';
import { isUserAuthenticated, clearAuthData } from '../utils/auth';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const authState = useSelector((state) => state.auth);
  
  // Check authentication status
  const isAuthenticated = authState?.isAuthenticated || isUserAuthenticated();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogout = () => {
    clearAuthData();
    toast.success('Logged out successfully!', { duration: 1000 });
    navigate('/');
  };

  // Check token expiration only on page load
  useEffect(() => {
    if (!isUserAuthenticated() && localStorage.getItem('token')) {
      clearAuthData();
      toast.error('Session expired. Please login again.', { duration: 2000 });
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className={`shadow-2xl sticky top-0 z-50 transition-all duration-500 backdrop-blur-lg ${
      isDarkMode ? 'bg-amber-900/90 text-white' : 'bg-white/90 text-gray-700'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-float-slow hover:scale-110 transition-transform duration-10000">
                <span className="text-white font-bold text-xl">🍰</span>
              </div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text ${
                isDarkMode ? 'text-white' : 'text-transparent'
              }`}>
                Negi Cake House
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`transition-colors font-medium ${
              location.pathname === '/' 
                ? 'text-orange-600 font-semibold' 
                : isDarkMode ? 'text-white hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
            }`}>Home</Link>
            <Link to="/products" className={`transition-colors font-medium ${
              location.pathname === '/products' 
                ? 'text-orange-600 font-semibold' 
                : isDarkMode ? 'text-white hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
            }`}>Products</Link>
            <Link to="/categories" className={`transition-colors font-medium ${
              location.pathname === '/categories' 
                ? 'text-orange-600 font-semibold' 
                : isDarkMode ? 'text-white hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
            }`}>Categories</Link>
            <Link to="/about" className={`transition-colors font-medium ${
              location.pathname === '/about' 
                ? 'text-orange-600 font-semibold' 
                : isDarkMode ? 'text-white hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
            }`}>About</Link>
            <Link to="/contact" className={`transition-colors font-medium ${
              location.pathname === '/contact' 
                ? 'text-orange-600 font-semibold' 
                : isDarkMode ? 'text-white hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
            }`}>Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${
                isDarkMode ? 'text-white hover:bg-amber-800' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Please login to view your wishlist!', { duration: 1000 });
                  navigate('/login');
                } else if (wishlistCount === 0) {
                  toast.error('Your wishlist is empty!', { duration: 1000 });
                  setTimeout(() => navigate('/products'), 1000);
                } else {
                  navigate('/likes');
                }
              }}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${
                isDarkMode ? 'text-white hover:bg-amber-800' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Please login to view your cart!', { duration: 1000 });
                  navigate('/login');
                } else if (cartCount === 0) {
                  toast.error('Your cart is empty!', { duration: 1000 });
                  setTimeout(() => navigate('/products'), 1000);
                } else {
                  navigate('/cart');
                }
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={`${
                    isDarkMode ? 'text-white hover:bg-amber-800' : 'hover:bg-gray-100'
                  }`}>
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`w-48 ${
                  isDarkMode ? 'bg-amber-800 text-white border-amber-700' : 'bg-white'
                }`}>
                  <DropdownMenuItem onClick={toggleDarkMode} className={`cursor-pointer ${
                    isDarkMode ? 'hover:bg-amber-700' : 'hover:bg-gray-100'
                  }`}>
                    {isDarkMode ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={isDarkMode ? 'bg-amber-700' : ''} />
                  <DropdownMenuItem onClick={handleLogout} className={`cursor-pointer text-red-500 ${
                    isDarkMode ? 'hover:bg-amber-700' : 'hover:bg-gray-100'
                  }`}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleDarkMode}
                  className={`${
                    isDarkMode ? 'text-white hover:bg-amber-800' : 'hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  className={`${
                    isDarkMode ? 'border-amber-600 text-white hover:bg-amber-800' : 'border-orange-300 text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => navigate('/login')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
