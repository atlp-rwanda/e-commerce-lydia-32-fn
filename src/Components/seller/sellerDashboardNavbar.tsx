import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import NotificationBar from "../../pages/seller/NotificationBar";

interface SellerDashboardNavbarProps {
  toggleSidebar: () => void;
}

const SellerDashboardNavbar: React.FC<SellerDashboardNavbarProps> = ({
  toggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
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
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell size={20} />
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
                      <a href="#profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                      <a href="#settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                      <a href="#logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
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