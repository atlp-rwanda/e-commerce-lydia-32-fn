
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartInfo = localStorage.getItem('cartInfo');
const parsedCartInfo = cartInfo ? JSON.parse(cartInfo) : [];

const initialState = {
  cartInfo: Array.isArray(parsedCartInfo) ? parsedCartInfo : []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartInfo(state, action: PayloadAction<any[]>) {
      state.cartInfo = action.payload;
      localStorage.setItem('cartInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setCartInfo } = cartSlice.actions;
export default cartSlice.reducer;