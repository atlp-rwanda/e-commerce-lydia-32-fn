import React, { useEffect, useState } from "react";
import { SlUser } from "react-icons/sl";
import { FaPhone, FaMapMarkerAlt, FaLock, FaCity, FaRoad, FaGlobeAmericas, FaFlag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useUpdateUserMutation, useChangePasswordMutation } from "../slices/authSlice/authApiSlice";
import toast from "react-hot-toast";
import { getCredentials } from "../slices/authSlice/authSlice";
import background from '../assets/Background.jpg';

interface FormData {
  firstname: string;
  othername: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  state: string;
  postalcode: string;
  oldPassword: string;
  newPassword: string;
}

interface Errors {
  firstname?: string;
  othername?: string;
  phone?: string;
  street?: string;
  city?: string;
  country?: string;
  state?: string;
  postalcode?: string;
  password?: string;
}

const Profile: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();

  useEffect(() => {
    if (!userInfo || !userInfo.user) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.user) {
    return null;
  }

  const [formData, setFormData] = useState<FormData>({
    firstname: userInfo.user.firstname,
    othername: userInfo.user.othername,
    phone: userInfo.user.phone,
    street: userInfo.user.street,
    city: userInfo.user.city,
    country: userInfo.user.country,
    state: userInfo.user.state,
    postalcode: userInfo.user.postal_code,
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors: Errors = {};
    const nameRegex = /^[a-zA-Z]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const addressRegex = /^[a-zA-Z0-9\s]+$/;

    if (!formData.firstname.trim() || !nameRegex.test(formData.firstname)) {
      newErrors.firstname = "First name is required and must contain only letters";
    }
    if (formData.othername && !nameRegex.test(formData.othername)) {
      newErrors.othername = "Last name must contain only letters";
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!addressRegex.test(formData.street)) {
      newErrors.street = "Invalid street address";
    }
    if (!nameRegex.test(formData.city)) {
      newErrors.city = "City must contain only letters";
    }
    if (!nameRegex.test(formData.state)) {
      newErrors.state = "State must contain only letters";
    }
    if (!nameRegex.test(formData.country)) {
      newErrors.country = "Country must contain only letters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await updateUser(formData).unwrap();
      dispatch(getCredentials(res));
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.oldPassword || !formData.newPassword) {
      setErrors((prev) => ({ ...prev, password: "Both old and new passwords are required" }));
      return;
    }

    setIsChangePassword(true);
    try {
      const res = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred");
    } finally {
      setIsChangePassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 mt-10">
      <div className="relative h-64 md:h-80 lg:h-96 bg-gray-100">
          <img 
            src={background} 
            alt="Office Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-1xl font-semi-bold">
              ACCOUNT
            </h1>
          </div>
        </div>
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                  <SlUser className="text-4xl text-gray-600" />
                </div>
                <h2 className="text-xl font-semibold">Hello, {userInfo.user.firstname}</h2>
              </div>
              <nav className="space-y-2">
                <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Home</Link>
                <Link to="/my-orders" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Orders</Link>
                <span className="block py-2 px-4 text-blue-600 font-semibold">Edit Profile</span>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 md:pl-8">
            <form onSubmit={handleUpdate}>
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstname">First Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <SlUser />
                      </span>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="othername">Last Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <SlUser />
                      </span>
                      <input
                        type="text"
                        id="othername"
                        name="othername"
                        value={formData.othername}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.othername && <p className="mt-1 text-sm text-red-600">{errors.othername}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaPhone />
                      </span>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6">Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">Country</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaGlobeAmericas />
                      </span>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">State</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaFlag />
                      </span>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">City</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaCity />
                      </span>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="street">Street</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaRoad />
                      </span>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="postalcode">Postal Code</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaMapMarkerAlt />
                      </span>
                      <input
                        type="text"
                        id="postalcode"
                        name="postalcode"
                        value={formData.postalcode}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.postalcode && <p className="mt-1 text-sm text-red-600">{errors.postalcode}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>

          {/* Change Password */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="oldPassword">Old Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaLock />
                      </span>
                      <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">New Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <FaLock />
                      </span>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                  disabled={isChangePassword}
                >
                  {isChangePassword ? "Changing Password..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;