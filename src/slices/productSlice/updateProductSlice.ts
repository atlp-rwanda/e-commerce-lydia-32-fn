import { apiSlice } from "../apiSlice";
const BASE_URL = "/product";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${BASE_URL}/update/${product.productId}`,
        method: "PUT",
        body: product,
      }),
    }),
  }),
});

export const { useUpdateProductMutation } = productApiSlice;
