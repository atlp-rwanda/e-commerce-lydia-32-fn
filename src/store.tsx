import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice/productSlice";
import authSlice from "./slices/authSlice/authSlice";
import { apiSlice } from "./slices/apiSlice";
import searchSlice from "./slices/searchSlice";
import requestRoleSlice from "./slices/roleSlice/requestRoleSlice";
import cartSlice from "./slices/cartSlice/cartSlice";
import permissionSlice from "./slices/permissionSlice/permissionSlice";
import userSlice from "./slices/usersSlice/userSlice";
import orderSlice from "./slices/orderSlice/orderSlice";
import sellerProductSlice from "./slices/sellerSlice/sellerProductSlice";
import sellerNotificationSlice from "./slices/notificationSlice/notificationSlice";
import wishlistSlice from "./slices/wishlistSlice/wishlistSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    sellerproducts: sellerProductSlice,
    sellernotifications: sellerNotificationSlice,
    auth: authSlice,
    search: searchSlice,
    role: requestRoleSlice,
    cart: cartSlice,
    permission: permissionSlice,
    users: userSlice,
    order: orderSlice,
    wishlist: wishlistSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
