import { apiSlice } from "../apiSlice";
export const BASE_URL = "/users"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/block/${id}`,
        method: "PUT",
      }),
    }),
   
  }),
});

export const { 
    useGetAllUsersQuery,
    useBlockUserMutation
} = usersApiSlice;
