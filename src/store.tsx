import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice/productSlice";
import authSlice from "./slices/authSlice/authSlice";
import { apiSlice } from "./slices/apiSlice";
import requestRoleSlice from "./slices/roleSlice/requestRoleSlice";
import permissionSlice from "./slices/permissionSlice/permissionSlice";
import userSlice from "./slices/usersSlice/userSlice";
import orderSlice from "./slices/orderSlice/orderSlice";


const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authSlice,
    role: requestRoleSlice,
    permission: permissionSlice,
    users: userSlice,
    order: orderSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware).concat(apiSlice.middleware), 
  devTools: true
});



export default store;

