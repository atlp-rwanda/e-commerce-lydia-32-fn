// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// interface CartState {
//   items: Product[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: CartState = {
//   items: [],
//   status: 'idle',
//   error: null,
// };

// export const addToCartAsync = createAsyncThunk(
//   'cart/addToCart',
//   async ({ productId, quantity }: { productId: number; quantity: number }) => {
//     const response = await fetch('/cart/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ productId, quantity }),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add item to cart');
//     }
//     return await response.json();
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<Product>) {
//       state.items.push(action.payload);
//     },
//     removeFromCart(state, action: PayloadAction<number>) {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     clearCart(state) {
//       state.items = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCartAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items.push(action.payload);
//       })
//       .addCase(addToCartAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message ?? 'Failed to add item to cart';
//       });
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;


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