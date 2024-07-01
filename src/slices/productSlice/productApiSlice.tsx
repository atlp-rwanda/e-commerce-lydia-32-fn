import { apiSlice } from "../apiSlice";
const BASE_URL = "/product"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: `${BASE_URL}/available`,
                method: 'GET'
            })
        })
    })
})

export const { useGetProductsQuery} = userApiSlice