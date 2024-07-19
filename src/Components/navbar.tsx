import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logOut } from "../slices/authSlice/authSlice";
import { useLogoutMutation } from "../slices/authSlice/authApiSlice";
import { useGetCartQuery } from "../slices/cartSlice/cartApiSlice";
import { FiSearch } from "react-icons/fi";
import wishlistIcon from "../assets/wishlistIcon.svg";

interface NavbarProps {
  onSearchToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { data: cart } = useGetCartQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartSize, setCartSize] = useState(0);
  const [logout] = useLogoutMutation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  setTimeout(
    () => {
      dispatch(logOut());
    },
    1000 * 60 * 60
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toogleSearch = () => {
    onSearchToggle();
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //@ts-ignore
      await logout().unwrap();
      dispatch(logOut());
      localStorage.removeItem("userInfo");
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

  const loggedUserInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    setCartSize(cart?.items?.length || 0);
  }, [cart]);

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-black">
              HOME
            </Link>
            <Link to="/shop" className="text-sm text-gray-600 hover:text-black">
              SHOP
            </Link>
            <Link
              to="/about"
              className="text-sm text-gray-600 hover:text-black"
            >
              ABOUT
            </Link>
            <Link to="/chat" className="text-sm text-gray-600 hover:text-black">
              CHAT
            </Link>
          </div>

          {/* Mobile layout */}
          <div className="flex items-center justify-between w-full md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="text-xl font-bold">DEPOT</div>

            <button onClick={toogleSearch} className="text-gray-600 hover:text-black">
              <FiSearch className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden md:block text-xl font-bold">DEPOT</div>

          <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="block text-sm text-gray-600 hover:text-black"
                >
                  {userInfo.user.firstname.toUpperCase()}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <button
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 "
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-black"
              >
                LOGIN
              </Link>
            )}
            {loggedUserInfo && (
              <Link
                to="/cart"
                className="text-sm text-gray-600 hover:text-black"
              >
                CART ({cartSize})
              </Link>
            )}
            <Link to="/my-orders"  className="text-sm text-gray-600 hover:text-black">ORDERS</Link>

            {loggedUserInfo && (
              <Link
                to="/wishlist"
                className="text-sm text-gray-600 hover:text-black"
              >
                <img src={wishlistIcon} alt="Wishlist Icon" className="w-4" />
              </Link>
            )}
            <button
              onClick={toogleSearch}
              className="text-gray-600 hover:text-black"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu with animation */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white z-20 transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <Link to="/" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">HOME</Link>
              <Link to="/shop" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">SHOP</Link>
              <Link to="/about" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">ABOUT</Link>
              <Link to="/chat" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">CHAT</Link>
              {loggedUserInfo && (
                <Link to="/cart" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">
                  CART ({cartSize})
                </Link>
              )}
              <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">ORDERS</Link>
              {userInfo ? (
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">
                  LOGOUT
                </button>
              ) : (
                <Link to="/login" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:translate-x-2">LOGIN</Link>
              )}
            </div>
          </div>
        </div>

        {/* Overlay with fade-in animation */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-50 z-10' : 'opacity-0 -z-10'
          }`}
          onClick={toggleMenu}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;