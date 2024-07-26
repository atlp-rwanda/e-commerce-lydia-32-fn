import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import toast from 'react-hot-toast';
import NotificationBar from "../../pages/seller/NotificationBar";
import { logOut } from '../../slices/authSlice/authSlice';
import { useLogoutMutation } from '../../slices/authSlice/authApiSlice';
import { useGetNotificationsQuery } from "../../slices/notificationSlice/notificationApiSlice";
import { setSellerNotificationsInfo } from "../../slices/notificationSlice/notificationSlice";

interface SellerDashboardNavbarProps {
  toggleSidebar: () => void;
}

const SellerDashboardNavbar: React.FC<SellerDashboardNavbarProps> = ({
  toggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const {
    data: sellerAllNotifications,
    refetch,
  } = useGetNotificationsQuery();

  useEffect(() => {
    if (sellerAllNotifications) {
      dispatch(setSellerNotificationsInfo(sellerAllNotifications));
      refetch();
    }
  }, [sellerAllNotifications, dispatch, refetch]);

  const unreadNotifications = sellerAllNotifications
    ? [...sellerAllNotifications.notifications]
        .filter((notification) => notification.readstatus === false)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    : [];
  const count = unreadNotifications.length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
    refetch();
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
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
        toast.error("Already logged out or not logged in");
      } else if (err.status === 401) {
        toast.error("User is not authenticated");
      } else {
        toast.error("Internal Server Error");
      }
    }
  };

  return (
    <nav className="bg-white text-gray-800 shadow-md py-2 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800 transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Seller Dashboard</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={20} />
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10">
                <NotificationBar onClose={() => setShowNotifications(false)} />
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User size={20} />
              <span className="font-medium">
                {userInfo ? userInfo.user.firstname : "Guest"}
              </span>
              <ChevronDown size={16} />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
                <div className="py-1">
                  {userInfo ? (
                    <>
                      <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                      <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                    </>
                  ) : (
                    <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SellerDashboardNavbar;