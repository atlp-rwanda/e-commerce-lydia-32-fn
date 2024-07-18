import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const wishlistInfo = localStorage.getItem("wishlistInfo");
const parsedWishlistInfo = wishlistInfo ? JSON.parse(wishlistInfo) : [];

const initialState = {
  wishlistInfo: Array.isArray(parsedWishlistInfo) ? parsedWishlistInfo : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistInfo(state, action: PayloadAction<any[]>) {
      state.wishlistInfo = action.payload;
      localStorage.setItem("wishlistInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setWishlistInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;
