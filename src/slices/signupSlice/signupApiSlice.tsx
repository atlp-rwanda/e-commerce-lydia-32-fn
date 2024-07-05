import { apiSlice } from "../apiSlice";
import { BASE_URL } from "../authSlice/authApiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL.users}/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUserRegisterMutation } = userApiSlice;
