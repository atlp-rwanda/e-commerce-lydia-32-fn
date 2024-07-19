import React, { useEffect } from "react";
import { setSellerNotificationsInfo } from "../../slices/notificationSlice/notificationSlice";
import { useDispatch } from "react-redux";
import Spinner from "../../Components/Spinners";
import { useGetNotificationsQuery } from "../../slices/notificationSlice/notificationApiSlice";
import Notification from "../../Components/seller/Notification";
import { formatDistanceToNow } from "date-fns";

//@ts-ignore
const NotificationBar: React.FC = ({ onClose }) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const {
    data: sellerAllNotifications,
    isLoading,
    error,
    refetch,
    //@ts-ignore
  } = useGetNotificationsQuery();

  useEffect(() => {
    if (sellerAllNotifications) {
      dispatch(setSellerNotificationsInfo(sellerAllNotifications));
      refetch();
    }
  }, [sellerAllNotifications, dispatch]);

  if (isLoading || !sellerAllNotifications) return '';
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const sortedNotifications = [...sellerAllNotifications.notifications].sort(
    (a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  );
  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-1/2 lg:w-1/3 bg-gray-100 p-6 shadow-lg overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button className="text-xl" onClick={onClose}>
          ✖️
        </button>
      </div>
      <div className="overflow-y-auto flex-grow">
        { sortedNotifications &&
           sortedNotifications.map((notification: any) => (
            <Notification
              key={notification.id}
              icon="🔔"
              message={notification.message}
              time={formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            />
          ))}
      </div>
    </div>
  );
};

export default NotificationBar;
