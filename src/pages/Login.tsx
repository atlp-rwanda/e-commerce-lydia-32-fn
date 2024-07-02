import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(getCredentials({ ...res }));
      toast.success('Login successful!');
      navigate('/');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || err.error || 'invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 ${email ? 'w-full' : 'w-0'} transition-all`}></div>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 ${password ? 'w-full' : 'w-0'} transition-all`}></div>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-600">REMEMBER ME</label>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-black">LOST YOUR PASSWORD?</Link>
        </div>
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <Link to="/register" className="text-sm text-blue-500 hover:text-blue-700">REGISTER</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
