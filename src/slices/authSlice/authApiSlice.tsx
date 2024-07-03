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
    })
})

export const {useLoginByGoogleMutation, useLoginMutation} = userApiSlice