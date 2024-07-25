import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notify } from '../../utils/notifyUsers';
import { notificationsApiSlice } from "./notificationApiSlice";

interface Notification {
  id: string;
  message: string;
}

interface SellerNotificationsState {
  sellernotificationsInfo: Notification[];
}

const sellernotificationsInfo = localStorage.getItem("sellerNotificationsInfo");
const parsedSellerNotificationsInfo = sellernotificationsInfo
  ? JSON.parse(sellernotificationsInfo)
  : [];

const initialState: SellerNotificationsState = {
  sellernotificationsInfo: Array.isArray(parsedSellerNotificationsInfo)
    ? parsedSellerNotificationsInfo
    : [],
};

const sellerNotificationSlice = createSlice({
  name: "sellernotifications",
  initialState,
  reducers: {
    setSellerNotificationsInfo(state, action: PayloadAction<Notification[]>) {
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
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationsApiSlice.endpoints.getNotifications.matchFulfilled,
      (state, { payload }) => {
        // Check if payload is an array, if not, try to extract notifications from it
        const notifications = Array.isArray(payload) ? payload : payload.notifications || [];
        
        if (Array.isArray(notifications)) {
          state.sellernotificationsInfo = notifications;
          localStorage.setItem(
            "sellerNotificationsInfo",
            JSON.stringify(notifications)
          );
          // Notify for new notifications
          const previousNotifications = state.sellernotificationsInfo;
          const newNotifications = notifications.filter(
            (notification) =>
              !previousNotifications.some(
                (existingNotification) => existingNotification.id === notification.id
              )
          );
          newNotifications.forEach(notification => notify(notification.message));
        } else {
          console.error("Unexpected payload structure:", payload);
        }
      }
    );
  },
});

export const { setSellerNotificationsInfo } = sellerNotificationSlice.actions;
export default sellerNotificationSlice.reducer;