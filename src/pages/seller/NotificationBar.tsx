import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
} from "../../slices/notificationSlice/notificationApiSlice";
import Notification from "../../Components/seller/Notification";
import { formatDistanceToNow } from "date-fns";

//@ts-ignore
const NotificationBar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const {
    data: sellerAllNotifications,
    isLoading,
    error,
    refetch,
    //@ts-ignore
  } = useGetNotificationsQuery();
  const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation();

  

  useEffect(() => {
    if (sellerAllNotifications) {
      dispatch(setSellerNotificationsInfo(sellerAllNotifications));
      console.log( sellerAllNotifications);
      refetch();
    }
  }, [sellerAllNotifications, dispatch, refetch]);

  if (isLoading || !sellerAllNotifications) return "";
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const sortedNotifications = [...sellerAllNotifications.notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead({}).unwrap();
      refetch;
    } catch (error) {
      console.error("Failed to mark all as read: ", error);
    }
  };
  return (
    <div className=" z-50 fixed right-0 top-0 h-full w-full sm:w-96 md:w-1/2 lg:w-1/3 bg-gray-100 p-6 shadow-lg overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>

        <button className="text-xl" onClick={onClose}>
          ✖️
        </button>
      </div>
      <div className=" text-right py-2 cursor-pointer">
        <button onClick={handleMarkAllAsRead}>Read all</button>
      </div>
      <div className="overflow-y-auto flex-grow">
        {!isMarking
          ? sortedNotifications &&
            sortedNotifications.map((notification: any) => (
              <Notification
                key={notification.id}
                icon="🔔"
                message={notification.message}
                status={notification.readstatus}
                time={formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              />
            ))
          : "Marking nots"}
      </div>
    </div>
  );
};

export default NotificationBar;
