import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderInfo = localStorage.getItem('orderInfo');
const parsedOrderInfo = orderInfo ? JSON.parse(orderInfo) : [];

const initialState = {
  orderInfo: Array.isArray(parsedOrderInfo) ? parsedOrderInfo : []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderInfo(state, action: PayloadAction<any[]>) {
      state.orderInfo = action.payload;
      localStorage.setItem('orderInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;