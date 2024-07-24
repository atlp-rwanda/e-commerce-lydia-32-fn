import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BarChart2, Package, PlusCircle, LogOut, Home } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "../../slices/authSlice/authSlice";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../../slices/authSlice/authApiSlice";

interface SellerSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellerSidebar: React.FC<SellerSidebarProps> = ({ isOpen, setIsOpen }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout().unwrap();
      dispatch(logOut());
      toast.success("You're Logged out");
      navigate("/login");
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err.status === 400) {
        toast.error("Already logged out or not logged in");
      } else if (err.status === 401) {
        toast.error("User is not authenticated");
      } else {
        toast.error("Internal Server Error");
      }
    }
  };

  const sidebarItems = [
    { path: "/seller/dashboard", icon: Home, label: "Home" },
    { path: "/seller/products", icon: Package, label: "Products" },
    { path: "/seller/newproduct", icon: PlusCircle, label: "Add Product" },
  ];

  return (
    <div
      className={`bg-white text-gray-800 h-screen ${
        isOpen ? "w-64" : "w-20"
      } fixed left-0 top-16 transition-all duration-300 shadow-md overflow-y-auto`}
    >
      <nav className="mt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center py-3 px-4 my-1 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <item.icon size={24} className={`${isOpen ? "mr-4" : "mx-auto"}`} />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`absolute bottom-5 left-0 w-full px-4 py-3 flex items-center text-red-600 hover:bg-red-100 transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <LogOut size={24} className={`${isOpen ? "mr-4" : "mx-auto"}`} />
        {isOpen && <span>Log Out</span>}
      </button>
    </div>
  );
};

export default SellerSidebar;