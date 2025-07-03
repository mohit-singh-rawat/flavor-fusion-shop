import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

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
    <header className={`shadow-lg sticky top-0 z-50 transition-colors duration-300 ${
      isDarkMode ? 'bg-amber-900 text-white' : 'bg-white text-gray-700'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
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
            <Link to="/" className={`hover:text-orange-400 transition-colors font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-700 hover:text-orange-600'
            }`}>Home</Link>
            <Link to="/products" className={`hover:text-orange-400 transition-colors font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-700 hover:text-orange-600'
            }`}>Products</Link>
            <Link to="/categories" className={`hover:text-orange-400 transition-colors font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-700 hover:text-orange-600'
            }`}>Categories</Link>
            <Link to="/about" className={`hover:text-orange-400 transition-colors font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-700 hover:text-orange-600'
            }`}>About</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/likes">
              <Button variant="ghost" size="icon" className={`relative ${
                isDarkMode ? 'text-white hover:bg-amber-800' : 'hover:bg-gray-100'
              }`}>
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className={`relative ${
                isDarkMode ? 'text-white hover:bg-amber-800' : 'hover:bg-gray-100'
              }`}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
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
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative max-w-md mx-auto">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isDarkMode ? 'text-amber-300' : 'text-gray-400'
          }`} />
          <Input 
            placeholder="Search for cakes, burgers, combos..." 
            className={`pl-10 transition-colors ${
              isDarkMode 
                ? 'bg-amber-800 border-amber-700 text-white placeholder:text-amber-300 focus:border-orange-400' 
                : 'bg-gray-50 border-gray-200 focus:border-orange-300'
            }`}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
