import { apiSlice } from "../apiSlice";

export interface SellerStatItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    images: string[];
    productId: number;
    userId: number;
    productName: string;
    description: string;
    productCategory: string;
    price: number;
    quantity: number;
    dimensions: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersByBuyer: builder.query({
      query: () => ({
        url: `/order`,
        method: "GET"
      }),
    }),
    buyerPlaceOrder: builder.mutation({
      query: (data) => ({
        url: `/order/create`,
        method: "POST",
        body: data,
      }),
    }),
    buyerGetAllOrders: builder.query({
      query: () => ({
        url: `/order`,
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
        url: `/order/${id}`,
        method: "GET"
      }),
    }),
    adminGetAllOrders: builder.query({
      query: () => ({
        url: `/order/admin`,
        method: "GET"
      }),
    }),
    getSellerStats: builder.query<SellerStatItem[], void>({
      query: () => '/seller/stats',
      transformResponse: (response: { stats: SellerStatItem[] }) => {
        console.log('Raw response in transformResponse:', response);
        return response.stats || [];
      },
    }),
  }),
});

export const { 
  useAdminGetAllOrdersQuery,
  useBuyerGetAllOrdersQuery,
  useBuyerPlaceOrderMutation,
  useGetAllOrdersByBuyerQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useGetSellerStatsQuery,
} = orderApiSlice;