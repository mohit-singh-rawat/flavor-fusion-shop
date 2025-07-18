import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSidebar from './AdminSidebar';
import { isUserAuthenticated } from '../../utils/auth';
import { toast } from 'sonner';

const AdminLayout = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const isAuthenticated = authState?.isAuthenticated || isUserAuthenticated();
      
      if (!isAuthenticated) {
        toast.error('Please login to access admin panel');
        navigate('/login');
        return;
      }
      
      // Check if user is admin
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'admin') {
        toast.error('You do not have admin privileges');
        navigate('/');
      }
    };
    
    checkAdmin();
  }, [navigate, authState]);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;