import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const productInfo = localStorage.getItem('productInfo');
const parsedTodoInfo = productInfo ? JSON.parse(productInfo) : [];

const initialState = {
  productInfo: Array.isArray(parsedTodoInfo) ? parsedTodoInfo : []
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductInfo(state, action: PayloadAction<any[]>) {
      state.productInfo = action.payload;
      localStorage.setItem('productInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setProductInfo } = productSlice.actions;
export default productSlice.reducer;