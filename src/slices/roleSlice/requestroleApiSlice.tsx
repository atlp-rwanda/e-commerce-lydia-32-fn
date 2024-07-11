import { apiSlice } from "../apiSlice";
export const BASE_URL = "/roles"

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestToBeSeller: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/requestTobeSeller`,
        method: "POST",
      }),
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        body: data
      }),
    }),
    addRoleToUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/assign/${data.id}`,
        method: "POST",
        body: data
      }),
    }),
    getRoles: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET"
      }),
    }),
    updateRole: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/update/${data.id}`,
        method: "PUT",
        body: data
      }),
    }),
    DeleteRole: builder.mutation({
      query: (roleId) => ({
        url: `${BASE_URL}/delete/${roleId}`,
        method: "DELETE"
      }),
    }),
    getRolePermission: builder.query({
      query: () => ({
        url: `/rolesPermission`,
        method: "GET"
      }),
    }),
  }),
});

export const { 
  useRequestToBeSellerMutation, 
  useAddRoleToUserMutation,
  useCreateRoleMutation, 
  useGetRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetRolePermissionQuery
} = roleApiSlice;
