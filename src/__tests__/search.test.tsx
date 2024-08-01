import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import Search from '../Components/search';
import searchReducer from '../slices/searchSlice';
import * as productApiSlice from '../slices/productSlice/productApiSlice';
import { vi } from 'vitest';

vi.mock('../slices/productSlice/productApiSlice', () => {
  return {
    ...vi.importActual('../slices/productSlice/productApiSlice'),
    useSearchProductsQuery: vi.fn(),
  };
});

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
  },
  error: vi.fn(),
}));

vi.mock('../Components/product', () => ({
  default: function MockProductCard({ product }) {
    return <div data-testid={`product-${product.productId}`}>{product.productName}</div>;
  },
}));

describe('Search Component', () => {
  let store: EnhancedStore;

  const mockProducts = [
    { productId: 1, productName: 'Product 1', price: 10 },
    { productId: 2, productName: 'Product 2', price: 20 },
    { productId: 3, productName: 'Product 3', price: 30 },
    { productId: 4, productName: 'Product 4', price: 40 },
    { productId: 5, productName: 'Product 5', price: 50 },
    { productId: 6, productName: 'Product 6', price: 60 },
    { productId: 7, productName: 'Product 7', price: 70 },
  ];

  const mockUseSearchProductsQuery = vi.fn();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        search: searchReducer,
        productApiSlice: (state = {}, action) => state,
      },
    });

    (productApiSlice.useSearchProductsQuery as jest.Mock).mockImplementation(mockUseSearchProductsQuery);

    mockUseSearchProductsQuery.mockReturnValue({
      data: { products: mockProducts, totalPages: 2, currentPage: 1 },
      isLoading: false,
      isError: false,
      error: null,
    });

    localStorage.clear();
  });

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <Search isVisible={true} onClose={() => {}} {...props} />
      </Provider>
    );
  };

  test('renders search form', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max Price')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('updates search term on input change', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'test product' } });
    expect(input).toHaveValue('test product');
  });

  test('updates category on select change', () => {
    renderComponent();
    const select = screen.getByText('All Categories');
    fireEvent.change(select, { target: { value: 'Electronics' } });
    expect(select).toHaveValue('Electronics');
  });
 
  test('updates min and max price on input change', () => {
    renderComponent();
    const minPrice = screen.getByPlaceholderText('Min Price');
    const maxPrice = screen.getByPlaceholderText('Max Price');
    fireEvent.change(minPrice, { target: { value: '10' } });
    fireEvent.change(maxPrice, { target: { value: '100' } });
    expect(minPrice).toHaveValue('10');
    expect(maxPrice).toHaveValue('100');
  });

  test('performs search on form submit', async () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test product' } });
    
    // Use getByRole instead of getByText for select elements
    const categorySelect = screen.getByTestId('category-select');
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });
    
    const minPriceInput = screen.getByPlaceholderText('Min Price');
    fireEvent.change(minPriceInput, { target: { value: '10' } });
    
    const maxPriceInput = screen.getByPlaceholderText('Max Price');
    fireEvent.change(maxPriceInput, { target: { value: '100' } });
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      const state = store.getState().search;
      expect(state.searchTerm).toBe('test product');
      expect(state.category).toBe('Electronics');
      expect(state.minPrice).toBe(10);
      expect(state.maxPrice).toBe(100);
      
    });
  });

  test('displays "No products found" when search returns empty results', async () => {
    mockUseSearchProductsQuery.mockReturnValue({
      data: { products: [], totalPages: 0, currentPage: 1 },
      isLoading: false, 
      isError: false,
      error: null,
    });
    renderComponent();
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });
  });


});