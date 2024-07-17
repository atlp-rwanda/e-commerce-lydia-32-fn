import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.sellernotificationsInfo = action.payload;
      localStorage.setItem(
        "sellerNotificationsInfo",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setSellerNotificationsInfo } = sellerNotificationSlice.actions;
export default sellerNotificationSlice.reducer;
