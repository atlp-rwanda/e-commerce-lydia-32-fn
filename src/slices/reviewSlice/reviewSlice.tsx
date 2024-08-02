// reviewSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

interface Review {
  id: number;
  userId: number;
  productId: number;
  RatingValue: number;
  review: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstname: string;
    othername: string;
    email: string;
  };
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// export const selectAverageRating = (state: RootState) => {
//   const reviews = state.reviews.reviews;
//   if (reviews.length === 0) return 0;
//   const totalRating = reviews.reduce(
//     (sum: any, review: { RatingValue: number }) => sum + review.RatingValue,
//     0
//   );
//   return totalRating / reviews.length;
// };

export const { setReviews, addReview, setLoading, setError } =
  reviewSlice.actions;

export default reviewSlice.reducer;
