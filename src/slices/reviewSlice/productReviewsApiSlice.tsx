import { apiSlice } from "../apiSlice";
const BASE_URL = "/review";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        body: reviewData,
      }),
    }),
    getReviews: builder.query({
      query: (productId) => `/product/reviews/${productId}`,
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewsQuery } = reviewApiSlice;
