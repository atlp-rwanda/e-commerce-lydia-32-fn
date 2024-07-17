import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import analyticsIcon from "../../assets/analyticsIcon.png";
import newProductionIcon from "../../assets/newProductIcon.png";
import productIcon from "../../assets/productIcon.png";
import logoutIcon from "../../assets/logoutIcon.png";
import { logOut } from "../../slices/authSlice/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/authSlice/authApiSlice";

interface SellerSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellerSidebar: React.FC<SellerSidebarProps> = ({ isOpen, setIsOpen }) => {
  const [logout] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //@ts-ignore
      await logout().unwrap();
      dispatch(logOut());
      toast.success("You're Logged out");
      navigate("/login");
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err.status === 400) {
        toast.error("already logged out or not logged in");
      } else if (err.status === 401) {
        toast.error("User is not authenticated");
      } else {
        toast.error("Internal Server Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`bg-neutral-50 text-gray-800 h-screen ${
        isOpen ? "w-64" : "w-0"
      } fixed left-0 top-0 transition-all duration-300 flex flex-col items-center`}
    >
      <div className="p-5 flex justify-between items-center w-full">
        {isOpen && <h1 className="text-2xl font-bold">DASHBOARD</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
          {isOpen ? "<" : ""}
        </button>
      </div>

      <nav className="mt-5 flex-col justify-center items-center w-full ">
        <Link
          to="/seller/dashboard"
          className="flex items-center py-2 px-4  mt-4 rounded-full hover:bg-gray-200"
          onClick={closeSidebar}
        >
          <img src={analyticsIcon} alt="Analytics" className="w-6 h-6 mr-3" />
          {isOpen && "General Analytics"}
        </Link>
        <Link
          to="/seller/products"
          className="flex items-center py-2 px-4 mt-4 rounded-full hover:bg-gray-200"
          onClick={closeSidebar}
        >
          <img src={productIcon} alt="Products" className="w-6 h-6 mr-3" />
          {isOpen && "My Products"}
        </Link>
        <Link
          to="/seller/newproduct"
          className="flex items-center py-2 px-4 mt-4 rounded-full hover:bg-gray-200"
          onClick={closeSidebar}
        >
          <img
            src={newProductionIcon}
            alt="New Product"
            className="w-6 h-6 mr-3"
          />
          {isOpen && "Add New Product"}
        </Link>
      </nav>

      <div
        className="absolute bottom-5 left-0 w-full px-4"
        onClick={handleLogout}
      >
        <button className="w-full text-left py-2 flex items-center">
          <img src={logoutIcon} alt="Logout" className="w-6 h-6 mr-4" />
          {isOpen && "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default SellerSidebar;
