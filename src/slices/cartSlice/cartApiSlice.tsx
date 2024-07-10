import { apiSlice } from "../apiSlice";
const BASE_URL = "/cart"

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/add`,
                method: 'POST',
                body: data, 
            })
        }),
        getCart: builder.query({
            query: () => ({
                url: `${BASE_URL}`,
                method: 'GET',
            })
        }),
        updateCartItem: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/update/${data.id}`,
                method: 'POST',
                body: data, 
            }),
        }),
        deleteCartItem: builder.mutation<number, void>({
            query: (productId) => ({
                 url: `${BASE_URL}/delete/${productId}`,
                 method: 'DELETE',
            }),
        }),
         clearCart: builder.mutation({
            query: () => ({
                 url: `${BASE_URL}/delete`,
                 method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} = cartApiSlice;