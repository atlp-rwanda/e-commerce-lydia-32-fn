// MainContent.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import MainContent from '../Components/admin/MainContent';
import orderReducer from '../slices/orderSlice/orderSlice';
import { useAdminGetAllOrdersQuery } from '../slices/orderSlice/orderApiSlice';

vi.mock('../slices/orderSlice/orderApiSlice', () => ({
  useAdminGetAllOrdersQuery: vi.fn(),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      order: orderReducer,
    },
    preloadedState: initialState,
  });
};

vi.mock('../Components/Spinners', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe('MainContent Component', () => {
  const mockOrdersData = {
    AllOrders: [
      { id: 1, status: 'Paid' },
      { id: 2, status: 'Pending' },
    ],
  };

  beforeEach(() => {
    (useAdminGetAllOrdersQuery as jest.Mock).mockReturnValue({
      data: mockOrdersData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render Spinner while loading', () => {
    (useAdminGetAllOrdersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <MainContent />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the total sells and total orders when data is available', async () => {
    render(
      <Provider store={createMockStore()}>
        <MainContent />
      </Provider>
    );

    await waitFor(() => expect(screen.getByText('Total sells: 1')).toBeInTheDocument());
    expect(screen.getByText('Total Orders: 2')).toBeInTheDocument();
  });

 
});
