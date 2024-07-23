import { apiSlice } from "../apiSlice";
const BASE_URL = "/payment"

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        newPayment: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/pay/${data.orderId}`,
                method: 'POST',
                body: data, 
            })
        }),
        paymentSuccess: builder.query({
            query: (data) => ({
                url: `${BASE_URL}/success/${data.sessionId}/${data.orderId}`,
                method: 'GET',
            })
        }),
  }),
})

export const {
  useNewPaymentMutation,
  usePaymentSuccessQuery
} = paymentApiSlice;