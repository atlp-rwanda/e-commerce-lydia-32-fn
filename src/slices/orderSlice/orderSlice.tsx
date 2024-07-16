import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const orderInfo = localStorage.getItem('orderInfo');
const parsedOrderInfo = orderInfo ? JSON.parse(orderInfo) : [];

interface OrderState {
  orderInfo: any[];
  buyerOrders: any[];
  adminOrders: any[];
  currentOrder: any | null;
}

const initialState: OrderState = {
  orderInfo: Array.isArray(parsedOrderInfo) ? parsedOrderInfo : [],
  buyerOrders: [],
  adminOrders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderInfo(state, action: PayloadAction<any[]>) {
      state.orderInfo = action.payload;
      localStorage.setItem('orderInfo', JSON.stringify(action.payload));
    },
    setBuyerOrders(state, action: PayloadAction<any[]>) {
      state.buyerOrders = action.payload;
    },
    setCurrentOrder(state, action: PayloadAction<any>) {
      state.currentOrder = action.payload;
    },
    setAdminOrders(state, action: PayloadAction<any[]>) {
      state.adminOrders = action.payload;
    },
    clearOrderInfo(state) {
      state.orderInfo = [];
      localStorage.removeItem('orderInfo');
    }
  }
});

export const { 
  setOrderInfo, 
  setBuyerOrders, 
  setCurrentOrder,
  setAdminOrders, 
  clearOrderInfo,
} = orderSlice.actions;

export default orderSlice.reducer;