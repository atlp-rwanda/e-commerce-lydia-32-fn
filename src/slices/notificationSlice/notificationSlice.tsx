import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INotification {
  createdAt: Date;
  id: number;
  message: string;
  readstatus: boolean;
  updatedAt: Date;
  userId: number;
}

const sellernotificationsInfo: INotification[] = localStorage.getItem(
  "sellerNotificationsInfo"
)
const parsedSellerNotificationsInfo = sellernotificationsInfo
  ? JSON.parse(sellernotificationsInfo)
  : [];

const initialState = {
  sellernotificationsInfo: Array.isArray(parsedSellerNotificationsInfo)
    ? parsedSellerNotificationsInfo
    : [],
  unReadCount: 0,
};

const sellerNotificationSlice = createSlice({
  name: "sellernotifications",
  initialState,
  reducers: {
    setSellerNotificationsInfo(state, action: PayloadAction<INotification[]>) {
      state.sellernotificationsInfo = action.payload;
      // const unReadNots = state.sellernotificationsInfo.filter(
      //   (not) => not.readstatus !== true

      // );
      localStorage.setItem(
        "sellerNotificationsInfo",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setSellerNotificationsInfo } = sellerNotificationSlice.actions;
export default sellerNotificationSlice.reducer;
