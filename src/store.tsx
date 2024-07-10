import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice/productSlice";
import authSlice from "./slices/authSlice/authSlice";
import { apiSlice } from "./slices/apiSlice";
import requestRoleSlice from "./slices/roleSlice/requestRoleSlice";
import cartSlice from "./slices/cartSlice/cartSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authSlice,
    role: requestRoleSlice,
    cart: cartSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware).concat(apiSlice.middleware), 
  devTools: true
});

export default store;

