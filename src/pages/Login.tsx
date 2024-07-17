import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCredentials } from "../slices/authSlice/authSlice";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import {
  useLoginMutation,
  useLoginByGoogleMutation,
  useLoginTwoFaMutation,
} from "../slices/authSlice/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import Spinner from "../Components/Spinners";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [twoFactorCode, setTwoFactorCode] = useState<string>("");
  const [is2FARequired, setIs2FARequired] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);
  const [login] = useLoginMutation();
  const [loginByGoogle] = useLoginByGoogleMutation();
  const [login2FA] = useLoginTwoFaMutation();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isPasswordExpired) {
        navigate("/update-password");
      } else if (userInfo.user) {
        if (userInfo.user.roleId === 3) {
          navigate("/");
        } else if (userInfo.user.roleId === 1) {
          navigate("/admin/dashboard");
        }
      }
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      if (res.message === "2FA code sent to your email") {
        setIs2FARequired(true);
        return toast.success("2FA code sent to your email");
      }

      if (res.isPasswordExpired) {
        dispatch(getCredentials({ ...res }));
        navigate("/update-password");
        return toast.error(
          "Your password is expired. Please update your password."
        );
      }
      if (res.user.roleId === 1) {
        dispatch(getCredentials({ ...res }));
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        dispatch(getCredentials({ ...res }));
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err.status === 401) {
        toast.error("Incorrect email or password");
      } else if (err.status === 404) {
        toast.error("Email not found. Please check your email or register");
      } else {
        toast.error("An error occurred. Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit2FA = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await login2FA({ twoFactorCode }).unwrap();
      if (res.isPasswordExpired) {
        dispatch(getCredentials({ ...res }));
        navigate("/update-password");
        return toast.error(
          "Your password is expired. Please update your password."
        );
      }
      dispatch(getCredentials({ ...res }));
      toast.success("Login successful!");
      navigate("/seller/dashboard");
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err.status === 401) {
        toast.error("Incorrect 2FA code");
      } else {
        toast.error("An error occurred. Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const accessToken = response.access_token;
        const res = await loginByGoogle({ accessToken }).unwrap();
        dispatch(getCredentials({ ...res }));
        toast.success("login successfully");
        navigate("/");
      } catch (err) {
        //@ts-ignore
        toast.error(err?.data?.message || err.error);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.log("Google Sign-In failed:", error);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <Link
        to="/"
        className="absolute top-9 left-12 text-3xl text-gray-600 hover:text-black transition-all duration-300 transform hover:scale-110"
      >
        <FaHome className="animate-bounce" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 transform hover:scale-105 transition duration-300">
          LOGIN
        </h2>
        {!is2FARequired ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${email ? "w-full" : "w-0"}`}
              ></div>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${password ? "w-full" : "w-0"}`}
              ></div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 transform hover:scale-125 transition duration-300"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 select-none"
              >
                REMEMBER ME
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          // 2 factor form design
          <form onSubmit={handleSubmit2FA} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 2FA Code"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify 2FA Code"}
            </button>
          </form>
        )}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {isLoading && <Spinner />}
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
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-black transition duration-300"
          >
            LOST YOUR PASSWORD?
          </Link>
        </div>
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
