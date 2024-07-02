import React, { useEffect, useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { useLoginByGoogleMutation } from "../slices/authSlice/authApiSlice";
import { getCredentials } from "../slices/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinners";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginByGoogle] = useLoginByGoogleMutation()
  const {userInfo} = useSelector((state: any) => state.auth) 
 
  useEffect(() => {
    if(userInfo) {
      navigate('/')
     }
  }, [])
  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {

    setIsLoading(true);
    try {
      const accessToken = response.access_token
       const res = await loginByGoogle({accessToken}).unwrap()
      dispatch(getCredentials({...res}));
      toast.success('login successfully');
      navigate('/');
    } catch (err) {
        //@ts-ignore
      toast.error(err?.data?.message || err.error);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    },
    onError: (error) => {
      console.log('Google Sign-In failed:', error);
    },

  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 transform hover:scale-105 transition duration-300">LOGIN</h2>
        <form className="space-y-6" >
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
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
              required
            />
            <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${password ? 'w-full' : 'w-0'}`}></div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2 transform hover:scale-125 transition duration-300" />
            <label htmlFor="remember" className="text-sm text-gray-600 select-none">REMEMBER ME</label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        
           {isLoading && <Spinner/>}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleGoogleSignIn()}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-gray-600 hover:text-black transition duration-300">LOST YOUR PASSWORD</a>
        </div>
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700 transition duration-300">REGISTER</a>
        </div>
      </div>
    </div>  
  );
};

export default LoginForm;