import { apiSlice } from "../apiSlice";
export const BASE_URL = "/order/admin"
export const ORDER_URL = "/order"

export const BASE_URL = "/order";
export const ADMIN_BASE_URL = "/order/admin";

export const orderApiSlice = apiSlice.injectEndpoints({
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersByBuyer: builder.query({
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
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/order/cancel/${id}`,
        method: 'DELETE',
      }),
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET"
      }),
    }),
    adminGetAllOrders: builder.query({
      query: () => ({
        url: `${ADMIN_BASE_URL}`,
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

  useGetAllOrdersByBuyerQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useAdminGetAllOrdersQuery
} = orderApiSlice;