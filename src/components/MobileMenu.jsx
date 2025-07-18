import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Package, Grid3X3, Info, Phone, GitCompare, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { isUserAuthenticated, clearAuthData } from '../utils/auth';
import { authActionTypes } from '../redux/auth/constant';
import { toast } from 'sonner';

const MobileMenu = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState?.isAuthenticated || isUserAuthenticated();

  const handleLogout = () => {
    clearAuthData();
    dispatch({ type: authActionTypes.AUTH_LOGIN_RESET });
    toast.success('Logged out successfully!');
    navigate('/');
    setIsOpen(false);
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/categories', label: 'Categories', icon: Grid3X3 },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
    { path: '/compare', label: 'Compare', icon: GitCompare },
  ];

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={isDarkMode ? 'text-white' : 'text-gray-700'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 ${
          isDarkMode ? 'bg-amber-900' : 'bg-white'
        } border-t shadow-lg z-50`}>
          <div className="py-4">
            {menuItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-6 py-3 transition-colors ${
                  location.pathname === path
                    ? 'text-orange-600 bg-orange-50 font-semibold'
                    : isDarkMode 
                      ? 'text-white hover:bg-amber-800' 
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            ))}
            
            <div className="border-t mt-4 pt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-6 py-3 transition-colors ${
                      isDarkMode ? 'text-white hover:bg-amber-800' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center w-full px-6 py-3 transition-colors text-red-500 ${
                      isDarkMode ? 'hover:bg-amber-800' : 'hover:bg-gray-50'
                    }`}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-6 py-3 transition-colors ${
                    isDarkMode ? 'text-white hover:bg-amber-800' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;