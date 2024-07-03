import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice/productSlice';
import authSlice from './slices/authSlice/authSlice';
import { apiSlice } from './slices/apiSlice';


const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer 
    auth: authReducer,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware).concat(apiSlice.middleware), // Add userApi middleware
  devTools: true
});



export default store;
