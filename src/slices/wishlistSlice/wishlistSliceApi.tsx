import { apiSlice } from "../apiSlice";
export const BASE_URL = "/wishlist";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    GetAllwishlist: builder.query({
      query: () => ({
        url: `${BASE_URL}/getUserWishlists`,
        method: "GET",
      }),
    }),
    deleteWishlistItem: builder.mutation<number, number>({
      query: (itemId) => ({
        url: `${BASE_URL}/removeItem/${itemId}`,
        method: "DELETE",
      }),
    }),
    addToWishlist: builder.mutation<{ Success: string }, number>({
      query: (productId) => ({
        url: `${BASE_URL}/addItem/${productId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllwishlistQuery,
  useDeleteWishlistItemMutation,
  useAddToWishlistMutation,
} = wishlistApiSlice;
