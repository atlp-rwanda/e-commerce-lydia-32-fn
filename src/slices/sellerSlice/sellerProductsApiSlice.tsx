import { apiSlice } from "../apiSlice";
const BASE_URL = "/seller";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellerProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}/products`,
        method: "GET",
      }),
    }),
    getSingleSellerProduct: builder.query({
      query: (id: string) => ({
        url: `${BASE_URL}/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSellerProductsQuery, useGetSingleSellerProductQuery } = productApiSlice;
