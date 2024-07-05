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
        loginTwoFa: builder.mutation({
          query:  (data) => ({
            url: `${BASE_URL}/factor`,
            method: 'POST',
            body: data
          })
        })
    })

})

export const {useLoginByGoogleMutation, useLoginMutation, useLoginTwoFaMutation} = userApiSlice
