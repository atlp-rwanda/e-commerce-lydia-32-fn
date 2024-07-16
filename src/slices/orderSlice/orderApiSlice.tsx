import { apiSlice } from "../apiSlice";

export const BASE_URL = "/order";
export const ADMIN_BASE_URL = "/order/admin";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersByBuyer: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET"
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
  useGetAllOrdersByBuyerQuery,
  useGetOrderByIdQuery,
  useAdminGetAllOrdersQuery
} = orderApiSlice;