import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice/productSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    [apiSlice.reducerPath]: apiSlice.reducer 
  },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;