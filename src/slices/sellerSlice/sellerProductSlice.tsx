import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sellerproductsInfo = localStorage.getItem("sellerProductsInfo");
const parsedSellerProductsInfo = sellerproductsInfo
  ? JSON.parse(sellerproductsInfo)
  : [];

const initialState = {
  sellerproductsInfo: Array.isArray(parsedSellerProductsInfo)
    ? parsedSellerProductsInfo
    : [],
};

const sellerproductSlice = createSlice({
  name: "sellerproducts",
  initialState,
  reducers: {
    setSellerProductsInfo(state, action: PayloadAction<any[]>) {
      state.sellerproductsInfo = action.payload;
      localStorage.setItem(
        "sellerProductsInfo",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setSellerProductsInfo } = sellerproductSlice.actions;
export default sellerproductSlice.reducer;
