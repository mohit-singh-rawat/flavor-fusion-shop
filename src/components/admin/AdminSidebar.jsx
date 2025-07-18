import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Package, 
  MessageSquare, 
  Settings,
  LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { authActionTypes } from '../../redux/auth/constant';
import { clearAuthData } from '../../utils/auth';
import { toast } from 'sonner';

const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/chat', icon: MessageSquare, label: 'Customer Support' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];
  
  const handleLogout = () => {
    clearAuthData();
    dispatch({ type: authActionTypes.AUTH_LOGIN_RESET });
    toast.success('Logged out successfully!');
  };
  
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🍰</span>
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-gray-800 text-orange-400'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Link to="/" onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;