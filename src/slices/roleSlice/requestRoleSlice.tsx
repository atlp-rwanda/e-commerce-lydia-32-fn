import { createSlice } from "@reduxjs/toolkit";
import { roleApiSlice } from "./requestroleApiSlice";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        roleApiSlice.endpoints.requestToBeSeller.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )
      .addMatcher(
        roleApiSlice.endpoints.requestToBeSeller.matchFulfilled,
        (state) => {
          state.loading = false;
          state.success = true;
        }
      )
      .addMatcher(
        roleApiSlice.endpoints.requestToBeSeller.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default roleSlice.reducer;
