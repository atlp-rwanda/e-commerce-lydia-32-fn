import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice/productSlice";
import authSlice from "./slices/authSlice/authSlice";
import { apiSlice } from "./slices/apiSlice";
import searchSlice from './slices/searchSlice';
import requestRoleSlice from "./slices/roleSlice/requestRoleSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authSlice,
    search: searchSlice,
    role: requestRoleSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware).concat(apiSlice.middleware), 
  devTools: true
});

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

export default store;

