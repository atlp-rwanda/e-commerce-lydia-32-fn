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

export interface SearchProductsResponse {
  message: string;
  products: Product[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${BASE_URL}/available`,
        method: "GET",
      }),
    }),
    searchProducts: builder.query<SearchProductsResponse, string>({
      query: (searchParams) => ({
        url: `${BASE_URL}/search?${searchParams}`,
        method: "GET",
      }),
      transformErrorResponse: (response: { status: string; data: any }) => {
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
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useAddProductMutation,
} = productApiSlice;
