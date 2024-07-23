import React, { useEffect, useState } from "react";
import profileIcon from "../../assets/profileIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import humburgerIcon from "../../assets/hamburgerIcon.svg";
import NotificationBar from "../../pages/seller/NotificationBar";
import NotificationIcon from "../NotificationIcon";
import { useGetNotificationsQuery } from "../../slices/notificationSlice/notificationApiSlice";
import { setSellerNotificationsInfo } from "../../slices/notificationSlice/notificationSlice";
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
    const dispatch = useDispatch();
  const handleNotificationClose = () => {
    setShowNotifications(false);
  };

   const {
   data: sellerAllNotifications,
   refetch,
   //@ts-ignore
 } = useGetNotificationsQuery();
 
 useEffect(() => {
   if (sellerAllNotifications) {
     dispatch(setSellerNotificationsInfo(sellerAllNotifications));
     refetch();
   }
 }, [sellerAllNotifications, dispatch]);


 const unreadNotifications = sellerAllNotifications
   ? [...sellerAllNotifications.notifications]
       .filter((notification) => notification.readstatus === false)
       .sort(
         (a, b) =>
           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
       )
   : [];
const count = unreadNotifications.length


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
            <NotificationIcon count={count}/>
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
