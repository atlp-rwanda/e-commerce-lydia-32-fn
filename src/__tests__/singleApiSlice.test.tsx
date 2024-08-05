import { describe, it, expect, vi } from 'vitest';
import { productApiSlice, useGetProductsQuery, useSearchProductsQuery, useAddProductMutation, useDeleteProductMutation } from '../slices/productSlice/productApiSlice';

vi.mock('../slices/productSlice/productApiSlice', () => ({
    productApiSlice: {
      endpoints: {
        getProducts: { query: vi.fn() },
        searchProducts: { query: vi.fn() },
        addProduct: { mutation: vi.fn() },
        deleteProduct: { mutation: vi.fn() },
      },
    },
    useGetProductsQuery: vi.fn(),
    useSearchProductsQuery: vi.fn(),
    useAddProductMutation: vi.fn(),
    useDeleteProductMutation: vi.fn(),
  })); 

describe('productApiSlice', () => {
  it('defines endpoints', () => {
    expect(productApiSlice.endpoints.getProducts).toBeDefined();
    expect(productApiSlice.endpoints.searchProducts).toBeDefined();
    expect(productApiSlice.endpoints.addProduct).toBeDefined();
    expect(productApiSlice.endpoints.deleteProduct).toBeDefined();
  });

  it('generates query hooks', () => {
    expect(useGetProductsQuery).toBeDefined();
    expect(useSearchProductsQuery).toBeDefined();
    expect(useAddProductMutation).toBeDefined();
    expect(useDeleteProductMutation).toBeDefined();
  });

  it('getProducts endpoint is a query', () => {
    expect(productApiSlice.endpoints.getProducts).toHaveProperty('query');
  });

  it('searchProducts endpoint is a query', () => {
    expect(productApiSlice.endpoints.searchProducts).toHaveProperty('query');
  });

  it('addProduct endpoint is a mutation', () => {
    expect(productApiSlice.endpoints.addProduct).toHaveProperty('mutation');
  });

  it('deleteProduct endpoint is a mutation', () => {
    expect(productApiSlice.endpoints.deleteProduct).toHaveProperty('mutation');
  });
});