import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notify } from '../../utils/notifyUsers';

const sellernotificationsInfo = localStorage.getItem("sellerNotificationsInfo");
const parsedSellerNotificationsInfo = sellernotificationsInfo
  ? JSON.parse(sellernotificationsInfo)
  : [];

const initialState = {
  sellernotificationsInfo: Array.isArray(parsedSellerNotificationsInfo)
    ? parsedSellerNotificationsInfo
    : [],
};

const sellerNotificationSlice = createSlice({
  name: "sellernotifications",
  initialState,
  reducers: {
    setSellerNotificationsInfo(state, action: PayloadAction<any[]>) {
      const currentNotifications = action.payload;

      if (Array.isArray(currentNotifications)) {
        const previousNotifications = state.sellernotificationsInfo;
        
        // Find new notifications
        const newNotifications = currentNotifications.filter(
          (notification) =>
            !previousNotifications.some(
              (existingNotification) => existingNotification.id === notification.id
            )
        );

        // Notify for new notifications
        if (newNotifications.length > 0) {
          newNotifications.forEach(notification => notify(notification.message));
        }

        // Update state and localStorage
        state.sellernotificationsInfo = currentNotifications;
        localStorage.setItem(
          "sellerNotificationsInfo",
          JSON.stringify(currentNotifications)
        );
      } else {
        console.error("Expected payload to be an array but got:", currentNotifications);
      }
    },
  },
});

export const { setSellerNotificationsInfo } = sellerNotificationSlice.actions;
export default sellerNotificationSlice.reducer;
