import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import RecentOrders from '../Components/admin/RecentOrders';
import orderReducer from '../slices/orderSlice/orderSlice';
import { useAdminGetAllOrdersQuery } from '../slices/orderSlice/orderApiSlice';

vi.mock('../slices/orderSlice/orderApiSlice', () => ({
  useAdminGetAllOrdersQuery: vi.fn(),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      orders: orderReducer,
    },
    preloadedState: initialState,
  });
};

vi.mock('../Components/Spinners', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe('RecentOrders Component', () => {
  const mockOrdersData = {
    AllOrders: [
      { orderId: 1, buyerId: 'Buyer 1', status: 'Pending', createdAt: '2024-08-01' },
      { orderId: 2, buyerId: 'Buyer 2', status: 'Shipped', createdAt: '2024-08-02' },
    ],
  };

  beforeEach(() => {
    useAdminGetAllOrdersQuery.mockReturnValue({
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
    useAdminGetAllOrdersQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <RecentOrders />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the table with orders when data is available', async () => {
    render(
      <Provider store={createMockStore()}>
        <RecentOrders />
      </Provider>
    );

    expect(screen.getByText('Buyer Id')).toBeInTheDocument();
    expect(screen.getByText('Orders Id')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Due Date')).toBeInTheDocument();

    expect(screen.getByText('Buyer 1')).toBeInTheDocument();
    expect(screen.getByText('Buyer 2')).toBeInTheDocument();
  });

  it('should dispatch setOrderInfo when data is fetched', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <RecentOrders />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().orders.orderInfo).toEqual(mockOrdersData);
    });
  });

  it('should paginate correctly', async () => {
    const mockPaginatedOrdersData = {
      AllOrders: Array.from({ length: 20 }, (_, i) => ({
        orderId: i + 1,
        buyerId: `Buyer ${i + 1}`,
        status: i % 2 === 0 ? 'Pending' : 'Shipped',
        createdAt: `2024-08-${String(i + 1).padStart(2, '0')}`,
      })),
    };

    useAdminGetAllOrdersQuery.mockReturnValue({
      data: mockPaginatedOrdersData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <RecentOrders />
      </Provider>
    );

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`Buyer ${i}`)).toBeInTheDocument();
    }

    const page2Button = screen.getAllByRole('button').find(button => button.textContent === '2');
    fireEvent.click(page2Button!);

    await waitFor(() => {
      for (let i = 11; i <= 20; i++) {
        expect(screen.getByText(`Buyer ${i}`)).toBeInTheDocument();
      }
    });

    const page1Button = screen.getAllByRole('button').find(button => button.textContent === '1');
    fireEvent.click(page1Button!);
    await waitFor(() => {
      for (let i = 1; i <= 10; i++) {
        expect(screen.getByText(`Buyer ${i}`)).toBeInTheDocument();
      }
    });
  });
});
