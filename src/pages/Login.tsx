import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);
  const [login] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      setIsLoading(false);
      return;
    }
  
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(getCredentials({ ...res }));
      toast.success('Login successful!');
      navigate('/');
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err.status === 401) {
        toast.error('Incorrect email or password');
      } else if (err.status === 404) {
        toast.error('Email not found. Please check your email or register');
      } else {
        toast.error('An error occurred. Please try again later');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <Link 
        to="/" 
        className="absolute top-4 left-4 text-3xl text-gray-600 hover:text-black transition-all duration-300 transform hover:scale-110"
      >
        <FaHome className="animate-bounce" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 transform hover:scale-105 transition duration-300">LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${email ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${password ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2 transform hover:scale-125 transition duration-300" />
            <label htmlFor="remember" className="text-sm text-gray-600 select-none">REMEMBER ME</label>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-black transition duration-300">LOST YOUR PASSWORD?</Link>
        </div>
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <Link to="/register" className="text-sm text-blue-500 hover:text-blue-700 transition duration-300">REGISTER</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;