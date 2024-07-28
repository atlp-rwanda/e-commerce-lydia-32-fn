import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logOut } from '../slices/authSlice/authSlice';
import { useLogoutMutation } from '../slices/authSlice/authApiSlice';
import { useGetCartQuery } from '../slices/cartSlice/cartApiSlice';
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiHeart, FiBell, FiUser } from 'react-icons/fi';
import NotificationBar from '../pages/seller/NotificationBar';
import { useGetNotificationsQuery } from "../slices/notificationSlice/notificationApiSlice";
import { setSellerNotificationsInfo } from '../slices/notificationSlice/notificationSlice';
import useCheckAuth from './../hooks/useCheckAuth';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onSearchToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchToggle }) => {
  useCheckAuth();

  const [showNotifications, setShowNotifications] = useState(false);
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

  const { data: sellerAllNotifications, refetch } = useGetNotificationsQuery();

  useEffect(() => {
    if (sellerAllNotifications) {
      dispatch(setSellerNotificationsInfo(sellerAllNotifications));
      refetch();
    }
  }, [sellerAllNotifications, dispatch, refetch]);

  const unreadNotifications = sellerAllNotifications
    ? sellerAllNotifications.notifications.filter((notification) => !notification.readstatus).length
    : 0;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
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

  useEffect(() => {
    setCartSize(cart?.items?.length || 0);
  }, [cart]);

  const menuVariants = {
    closed: { x: "-100%" },
    open: { x: 0 }
  };

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop layout - structure maintained, icons updated */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-black">HOME</Link>
            <Link to="/shop" className="text-sm text-gray-600 hover:text-black">SHOP</Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-black">ABOUT</Link>
          </div>

          {/* Mobile layout - improved version from first design */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Logo - visible on all screen sizes */}
          <Link to="/" className="font-bold text-xl text-gray-800">DEPOT</Link>

          {/* Desktop right side - structure maintained, icons updated */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
            {userInfo && (
              <button onClick={handleNotificationClick} className="text-gray-600 hover:text-black relative">
                <FiBell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            )}
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-sm text-gray-600 hover:text-black"
                >
                  <FiUser size={20} className="mr-1" />
                  {userInfo.user.firstname}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-sm text-gray-600 hover:text-black">
                LOGIN
              </Link>
            )}
            {userInfo && (
              <Link to="/cart" className="text-gray-600 hover:text-black relative">
                <FiShoppingCart size={20} />
                {cartSize > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartSize}
                  </span>
                )}
              </Link>
            )}
            <button onClick={onSearchToggle} className="text-gray-600 hover:text-black">
              <FiSearch size={20} />
            </button>
            {userInfo && (
              <Link to="/wishlist" className="text-gray-600 hover:text-black">
                <FiHeart size={20} />
              </Link>
            )}
            {userInfo && (
              <Link to="/my-orders" className="text-sm text-gray-600 hover:text-black">ORDERS</Link>
            )}
          </div>

          {/* Mobile icons */}
          <div className="flex items-center space-x-4 md:hidden">
            <button onClick={onSearchToggle} className="text-gray-500 hover:text-gray-700">
              <FiSearch size={20} />
            </button>
            {userInfo && (
              <>
                <Link to="/cart" className="text-gray-500 hover:text-gray-700 relative">
                  <FiShoppingCart size={20} />
                  {cartSize > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartSize}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" className="text-gray-500 hover:text-gray-700">
                  <FiHeart size={20} />
                </Link>
                <button onClick={handleNotificationClick} className="text-gray-500 hover:text-gray-700 relative">
                  <FiBell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FiX size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
                  <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Shop</Link>
                  <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</Link>
                  {userInfo && (
                    <>
                      <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Cart</Link>
                      <Link to="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Wishlist</Link>
                      <Link to="/my-orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Orders</Link>
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 border-t">
                {userInfo ? (
                  <div className="flex items-center space-x-3">
                    <FiUser size={20} className="text-gray-500" />
                    <span className="text-gray-700">{userInfo.user.firstname}</span>
                    <button onClick={handleLogout} className="ml-auto text-red-600 hover:text-red-800">Logout</button>
                  </div>
                ) : (
                  <Link to="/login" className="block w-full px-4 py-2 text-center font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showNotifications && <NotificationBar />}
    </nav>
  );
};

export default Navbar;