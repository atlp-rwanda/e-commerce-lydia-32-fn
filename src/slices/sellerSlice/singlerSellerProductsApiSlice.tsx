import { apiSlice } from "../apiSlice";
const BASE_URL = "/product";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellerProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { deleteSellerProductQuery } = productApiSlice;
