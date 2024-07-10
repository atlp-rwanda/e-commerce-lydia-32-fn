import { apiSlice } from "../apiSlice";
export const BASE_URL = "/roles/permissions"

export const permissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPermission: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        body: data
      }),
    }),
    getPermissions: builder.query({
      query: () => ({
        url: `/permissions`,
        method: "GET"
      }),
    }),
    addPermissionToRole: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/add/${data.id}`,
        method: "POST",
        body: data
      }),
    }),
    removePermissionFromRole: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/remove/${data.id}`,
        method: "DELETE",
        body: data
      }),
    }),
    assignRoleToUser: builder.mutation({
      query: (data) => ({
        url: `/roles/assign/${data.id}`,
        method: "POST",
        body: data
      }),
    }),
    deletePermission: builder.mutation({
      query: (permissionId) => ({
        url: `/permissions/delete/${permissionId}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const { 
 useCreatePermissionMutation,
 useGetPermissionsQuery,
 useAddPermissionToRoleMutation,
 useAssignRoleToUserMutation,
 useRemovePermissionFromRoleMutation,
 useDeletePermissionMutation
} = permissionApiSlice;
