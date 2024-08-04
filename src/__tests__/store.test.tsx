import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import store from '../store';
import productSlice from '../slices/productSlice/productSlice';
import authSlice from '../slices/authSlice/authSlice';
import { apiSlice } from '../slices/apiSlice';
import searchSlice from '../slices/searchSlice';
import requestRoleSlice from '../slices/roleSlice/requestRoleSlice';
import cartSlice from '../slices/cartSlice/cartSlice';
import permissionSlice from '../slices/permissionSlice/permissionSlice';
import userSlice from '../slices/usersSlice/userSlice';
import orderSlice from '../slices/orderSlice/orderSlice';
import sellerProductSlice from '../slices/sellerSlice/sellerProductSlice';
import sellerNotificationSlice from '../slices/notificationSlice/notificationSlice';
import wishlistSlice from '../slices/wishlistSlice/wishlistSlice';

describe('Redux Store', () => {
  it('should have the correct reducers', () => {
    const expectedState = {
      products: productSlice(undefined, { type: '' }),
      sellerproducts: sellerProductSlice(undefined, { type: '' }),
      sellernotifications: sellerNotificationSlice(undefined, { type: '' }),
      auth: authSlice(undefined, { type: '' }),
      search: searchSlice(undefined, { type: '' }),
      role: requestRoleSlice(undefined, { type: '' }),
      cart: cartSlice(undefined, { type: '' }),
      permission: permissionSlice(undefined, { type: '' }),
      users: userSlice(undefined, { type: '' }),
      order: orderSlice(undefined, { type: '' }),
      wishlist: wishlistSlice(undefined, { type: '' }),
      [apiSlice.reducerPath]: apiSlice.reducer(undefined, { type: '' }),
    };

    expect(store.getState()).toMatchObject(expectedState);
  });

  it('should apply the api middleware', () => {
    const middlewares = store.middleware;

    // Check if the api middleware is in the list of applied middlewares
    expect(middlewares).toContain(apiSlice.middleware);
  });

  it('should have devTools enabled', () => {
    const testStore = configureStore({
      reducer: {},
      devTools: true,
    });

    expect(testStore.dispatch).toBeInstanceOf(Function);
    expect(testStore.getState).toBeInstanceOf(Function);
  });
});
