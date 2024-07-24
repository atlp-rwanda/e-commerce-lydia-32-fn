import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SellerStatItem } from './orderApiSlice';

const orderInfo = localStorage.getItem('orderInfo');
const parsedOrderInfo = orderInfo ? JSON.parse(orderInfo) : [];

interface OrderState {
  orderInfo: any[];
  buyerOrders: any[];
  adminOrders: any[];
  currentOrder: any | null;
  sellerStats: SellerStatItem[];
  sellerTotalAmount: number;
}

const initialState: OrderState = {
  orderInfo: Array.isArray(parsedOrderInfo) ? parsedOrderInfo : [],
  buyerOrders: [],
  adminOrders: [],
  currentOrder: null,
  sellerStats: [],
  sellerTotalAmount: 0,
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
    },
    setSellerStats(state, action: PayloadAction<SellerStatItem[]>) {
      console.log('Payload received in setSellerStats:', action.payload);
      if (Array.isArray(action.payload)) {
        state.sellerStats = action.payload;
        state.sellerTotalAmount = action.payload.reduce((total, item) => {
          return total + (item.product.price * item.quantity);
        }, 0) / 100; // Divide by 100 if the price is in cents
      } else {
        console.error('Expected an array for sellerStats, but received:', action.payload);
        state.sellerStats = [];
        state.sellerTotalAmount = 0;
      }
      console.log('Updated state:', state.sellerStats, state.sellerTotalAmount);
    },
  }
});

export const { 
  setOrderInfo, 
  setBuyerOrders, 
  setCurrentOrder,
  setAdminOrders, 
  clearOrderInfo,
  setSellerStats,
} = orderSlice.actions;

export default orderSlice.reducer;