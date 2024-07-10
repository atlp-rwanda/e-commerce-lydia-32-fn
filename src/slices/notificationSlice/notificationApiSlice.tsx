import { apiSlice } from "../apiSlice";
const BASE_URL = "/notifications";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApiSlice;
