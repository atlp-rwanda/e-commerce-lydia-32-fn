import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../Components/Spinners";
import {
  useRegisterByGoogleMutation,
  useUserRegisterMutation,
} from "../slices/authSlice/authApiSlice";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignupForm: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [othername, setOthername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [registerByGoogle] = useRegisterByGoogleMutation();
  const [userRegister] = useUserRegisterMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const accessToken = response.access_token;
        const res = await registerByGoogle({ accessToken }).unwrap();
        toast.success(res.message);
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await userRegister({
        firstname,
        othername,
        email,
        password,
        phone,
        street,
        city,
        country,
        state,
        postal_code: postalcode,
      }).unwrap();
      toast.success("Registration successful");
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      // Show modal on successful registration
      modal.showModal();

      setFirstname("");
      setOthername("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setStreet("");
      setCity("");
      setCountry("");
      setState("");
      setPostalcode("");
      // navigate("/login");
    } catch (err) {
      //@ts-ignore
      const errorMessages = err?.data?.errors || [err.error];
      //@ts-ignore
      toast.error(errorMessages[0] || err?.data?.message);
      //@ts-ignore
      console.log(errorMessages[0], err?.data?.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link
        to="/"
        className="absolute top-9 left-12 text-3xl text-gray-600 hover:text-black transition-all duration-300 transform hover:scale-110"
      >
        <FaHome className="animate-bounce" />
      </Link>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 transform hover:scale-105 transition duration-300">
          REGISTER
        </h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="flex space-x-8">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                  firstname ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="other name"
                value={othername}
                onChange={(e) => setOthername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                  othername ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div
              className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                email ? "w-full" : "w-0"
              }`}
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
              className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                password ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                  street ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                  city ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          </div>
          <div className="relative">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div
              className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                phone ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                  state ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div className="relative w-1/2">
              <input
                type="number"
                placeholder="Postal code"
                value={postalcode}
                onChange={(e) => setPostalcode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <div
                className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                  postalcode ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div
              className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                country ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "REGISTER"}
          </button>
        </form>

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

          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleGoogleRegister()}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign up with Google
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
          </span>
          <a
            href="/login"
            className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
          >
            LOGIN
          </a>
        </div>
      </div>

      <dialog
        id="my_modal_3"
        className="modal px-4 rounded-lg bg-gray-100 max-w-xl h-40"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex mt-10 flex-col items-center">
            <h3 className="font-bold text-lg">Email Verification Sent</h3>
            <p className="py-4">We sent an email for verifying your email</p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SignupForm;
