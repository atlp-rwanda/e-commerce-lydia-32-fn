import React, { useState } from "react";
import profileIcon from "../../assets/profileIcon.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notificationIcon from "../../assets/notification.svg";
import humburgerIcon from "../../assets/hamburgerIcon.svg";
import NotificationBar from "../../pages/seller/NotificationBar";

interface SellerDashboardNavbarProps {
  toggleSidebar: () => void;
}

const SellerDashboardNavbar: React.FC<SellerDashboardNavbarProps> = ({
  toggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClose = () => {
    setShowNotifications(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 text-gray-600">
            <img src={humburgerIcon} alt="Hamburger Icon" className="w-8" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div onClick={handleNotificationClick} className="relative">
            <img
              src={notificationIcon}
              alt="Notification icon"
              className="w-7 hover:cursor-pointer"
            />
            {showNotifications && <NotificationBar />}
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={profileIcon}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            {userInfo ? (
              <span>{userInfo.user.firstname}</span>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-black"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SellerDashboardNavbar;
