import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const validForm = () => {
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email');
    if (!formData.password.trim()) return toast.error('Password is required');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validForm()) {
      login(formData);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
      <div className='w-full max-w-md p-6 rounded-lg shadow-lg bg-gray-800 text-white'>
        <h1 className='text-3xl font-semibold text-center mb-6'>
          Login <span className='text-blue-500'>ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Email</label>
            <input
              type='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder='Enter your email'
              className='w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder='Enter your password'
              className='w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute top-9 right-3 cursor-pointer text-gray-400 hover:text-gray-200'
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </span>
          </div>

          <div className='text-center'>
            <Link to='/signup' className='text-blue-400 hover:underline text-sm'>
              Don't have an account? Sign Up
            </Link>
          </div>

          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center disabled:opacity-50'
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <LoaderCircle className='h-5 w-5 animate-spin' /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;