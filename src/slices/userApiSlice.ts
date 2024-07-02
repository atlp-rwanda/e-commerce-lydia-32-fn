import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.userInfo?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ email: string; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login/user',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;