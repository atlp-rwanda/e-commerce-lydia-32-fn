import { apiSlice } from "../apiSlice";
const BASE_URL = "/seller";

export const sellerproductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => {
                const userInfo = localStorage.getItem('userInfo');
                const token = userInfo ? JSON.parse(userInfo).token : null;
                
                return {
                    url: `${BASE_URL}/products`,
                    method: 'GET',
                    headers: token ? {
                        Authorization: `Bearer ${token}`
                    } : {}
                };
            }
        })
    })
});

export const { useGetProductsQuery } = sellerproductApiSlice;
