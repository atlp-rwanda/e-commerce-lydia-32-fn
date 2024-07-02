import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice/productSlice';
import authSlice from './slices/authSlice/authSlice';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import { userApi } from './slices/userApiSlice'; // Import userApi

const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer, // Add userApi reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware).concat(userApi.middleware), // Add userApi middleware
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
