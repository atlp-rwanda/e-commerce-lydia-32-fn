import { apiSlice } from "../apiSlice";
const BASE_URL = "/seller/products";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}/available`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApiSlice;
