import { apiSlice } from "../apiSlice";
const BASE_URL = "/users"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginByGoogle: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `/login/user`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url: `${BASE_URL}/logout`,
                method:'POST'
            })
        })
    })
})

export const { useLoginByGoogleMutation, useLoginMutation, useLogoutMutation } = userApiSlice