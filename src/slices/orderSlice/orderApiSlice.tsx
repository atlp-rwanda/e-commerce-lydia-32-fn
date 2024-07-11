import { apiSlice } from "../apiSlice";
export const BASE_URL = "/order/admin"

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    adminGetAllOrders: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET"
      }),
    }),
  }),
});

export const { 
 useAdminGetAllOrdersQuery
} = roleApiSlice;
