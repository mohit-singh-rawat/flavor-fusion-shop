import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createLoginAction } from '../redux/auth/action';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import '../styles/animations.css';
import { isUserAuthenticated } from '../utils/auth';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const authState = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (isUserAuthenticated()) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      return;
    }
    
    if (authState.isAuthenticated) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        variant: 'default',
      });
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
    if (authState.error) {
      toast({
        title: 'Login Failed',
        description: authState.error.response?.data?.message || authState.error.message || 'Invalid credentials',
        variant: 'destructive',
      });
    }
  }, [authState, navigate, toast, location]);

  const onSubmit = (data) => {
    dispatch(createLoginAction({ email: data.email, password: data.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center account-page bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in-up hover-lift">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <span className="text-white font-bold text-2xl">🍰</span>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input id="email" type="email" {...register('email', { required: true })} placeholder="you@example.com" />
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                {...register('password', { required: true })} 
                placeholder="Enter your password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">Password is required</p>}
          </div>

          <Button 
            type="submit" 
            disabled={authState.loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {authState.loading ? 'Logging in...' : '🚀 Login'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
