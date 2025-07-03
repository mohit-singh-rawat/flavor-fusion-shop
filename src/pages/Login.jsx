import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createLoginAction } from '../redux/auth/action';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
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
        description: authState.error.message || 'Invalid credentials',
        variant: 'destructive',
      });
      navigate('/', { replace: true });
    }
  }, [authState, navigate, toast, location]);

  const onSubmit = (data) => {
    dispatch(createLoginAction({ email: data.email, password: data.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Login to Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input id="email" type="email" {...register('email', { required: true })} placeholder="you@example.com" />
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input id="password" type="password" {...register('password', { required: true })} placeholder="Enter your password" />
            {errors.password && <p className="text-sm text-red-500 mt-1">Password is required</p>}
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            Login
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
