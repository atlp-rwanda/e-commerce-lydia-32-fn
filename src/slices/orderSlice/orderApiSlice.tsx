import { apiSlice } from "../apiSlice";
export const BASE_URL = "/order/admin"
export const ORDER_URL = "/order"

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    adminGetAllOrders: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET"
      }),
    }),
    buyerPlaceOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/create`,
        method: "POST",
        body:data,
      }),
    }),
     buyerGetAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET"
      }),
    }),
  }),
});

export const { 
  useAdminGetAllOrdersQuery,
  useBuyerGetAllOrdersQuery,
  useBuyerPlaceOrderMutation,
} = orderApiSlice;
