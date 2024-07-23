import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { Product } from "../productSlice/productApiSlice";

interface IRootState {
  isEditing: boolean;
  editError: string | null;
}

const initialState: IRootState = {
  isEditing: false,
  editError: null,
};

export const editProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("seller/editproduct", async (product, { rejectWithValue }) => {
  try {
    const response = await api.put(
      `/api/product/update/${product.productId}`,
      product,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.updatedProduct as Product;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const sellerproductSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProduct.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.isEditing = false;
          console.log("from editing product-->", action.payload);
        }
      )
      .addCase(
        editProduct.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isEditing = false;
          state.editError = action.payload || null;
        }
      );
  },
});

export default sellerproductSlice.reducer;
