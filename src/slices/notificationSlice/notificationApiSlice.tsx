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
    markAllAsRead: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/markasread`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkAllAsReadMutation } =
  notificationsApiSlice;
