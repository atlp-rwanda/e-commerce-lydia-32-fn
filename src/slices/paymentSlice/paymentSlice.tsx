
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const paymentInfo = localStorage.getItem('paymentInfo');
const parsedPaymentInfo = paymentInfo ? JSON.parse(paymentInfo) : [];

const initialState = {
  paymentInfo: Array.isArray(parsedPaymentInfo) ? parsedPaymentInfo : []
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentInfo(state, action: PayloadAction<any[]>) {
      state.paymentInfo = action.payload;
      localStorage.setItem('paymentInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setPaymentInfo } = paymentSlice.actions;
export default paymentSlice.reducer;