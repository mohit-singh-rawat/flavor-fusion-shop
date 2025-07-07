import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createRegisterAction } from '../redux/auth/action';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import '../styles/animations.css';
import { isUserAuthenticated } from '../utils/auth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const authState = useSelector((state) => state.auth);
  console.log(authState,'authsate')

  useEffect(() => {
    // Check if user is already authenticated
    if (isUserAuthenticated()) {
      navigate('/', { replace: true });
      return;
    }
    
    if (authState.isRegistered) {
      toast({
        title: 'Registration Successful',
        description: 'You can now login with your credentials',
        variant: 'default',
      });
      navigate('/login');
    }
    if (authState.error) {
      toast({
        title: 'Registration Failed',
        description: authState.error.message || 'Please try again',
        variant: 'destructive',
      });
    }
  }, [authState, navigate, toast]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }
    dispatch(createRegisterAction({ username: data.name, email: data.email, password: data.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center account-page bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in-up hover-lift">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float-slow">
            <span className="text-white font-bold text-2xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Join Our Family!</h2>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required', minLength: 6 })}
            />
            {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword', { required: 'Please confirm your password' })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🎆 Create Account
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
