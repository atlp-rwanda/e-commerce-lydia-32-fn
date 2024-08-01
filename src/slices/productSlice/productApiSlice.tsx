// productApiSlice.ts
import { apiSlice } from "../apiSlice";

const BASE_URL = "/product";

export interface Product {
  productId: number;
  userId: number;
  productName: string;
  description: string;
  productCategory: string;
  price: number;
  quantity: number;
  images: string;
  dimensions?: string;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiryDate?: Date;
}

interface SearchParams {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  page: number;
  limit: number;
}

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${BASE_URL}/available`,
        method: "GET",
      }),
    }),
    searchProducts: builder.query<SearchResult, SearchParams>({
      query: (params) => ({
        url: '/product/search',
        method: 'GET',
        params,
      }),
      transformErrorResponse: (response: { status: string; data: any; }) => {
        if (response.data && response.data.error) {
          return response.data.error;
        }
        return "An unknown error occurred";
      },
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `${BASE_URL}/deleteProduct/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
