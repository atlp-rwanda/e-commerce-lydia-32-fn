import { apiSlice } from "../apiSlice";
export const BASE_URL = {
  users: "/users",
  roles: "/roles",
};

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestToBeSeller: builder.mutation({
      query: () => ({
        url: `${BASE_URL.roles}/requestTobeSeller`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRequestToBeSellerMutation } = roleApiSlice;
