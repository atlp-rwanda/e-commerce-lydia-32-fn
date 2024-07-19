import { apiSlice } from "../apiSlice";
const BASE_URL = "order";

export const buyerOrderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({

        buyerCreateOrder: builder.mutation({
            query: (orderData)=>({
                url: `${BASE_URL}/create`,
                method: "POST",
                body: orderData,
            }),
        }),
    }),
});

export const { useBuyerCreateOrderMutation} = buyerOrderApiSlice;