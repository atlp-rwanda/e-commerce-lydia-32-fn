import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Statistics from '../Components/admin/Statistics';
import { useAdminGetAllOrdersQuery } from '../slices/orderSlice/orderApiSlice';
import orderReducer from '../slices/orderSlice/orderSlice';

vi.mock('../slices/orderSlice/orderApiSlice', () => ({
  useAdminGetAllOrdersQuery: vi.fn(),
}));

vi.mock('../Components/Spinners', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

vi.mock('react-chartjs-2', () => ({
  Pie: (props: any) => <div data-testid="pie-chart">{JSON.stringify(props.data)}</div>,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      orders: orderReducer,
    },
    preloadedState: initialState,
  });
};

describe('Statistics Component', () => {
  const mockOrdersData = {
    AllOrders: [
      { id: 1, status: 'Paid' },
      { id: 2, status: 'Completed' },
      { id: 3, status: 'pending' },
      { id: 4, status: 'Paid' },
      { id: 5, status: 'Completed' },
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
        <MemoryRouter>
          <Statistics />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should correctly filter and count orders by status', async () => {
    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Statistics />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const pieChart = screen.getByTestId('pie-chart');
      const chartData = JSON.parse(pieChart.textContent || '{}');
      
      expect(chartData.datasets[0].data).toEqual([
        2,
        1, 
        2  
      ]);
    });
  });

  it('should call refetch on component mount', async () => {
    const refetchMock = vi.fn();

    useAdminGetAllOrdersQuery.mockReturnValue({
      data: mockOrdersData,
      isLoading: false,
      error: null,
      refetch: refetchMock,
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Statistics />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(refetchMock).toHaveBeenCalled();
    });
  });

  it('should render the Pie chart with correct labels and data', async () => {
    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Statistics />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const pieChart = screen.getByTestId('pie-chart');
      const chartData = JSON.parse(pieChart.textContent || '{}');

      expect(chartData.labels).toEqual(['Completed', 'Pending', 'Paid']);
      expect(chartData.datasets[0].label).toBe('# of Orders');
      expect(chartData.datasets[0].backgroundColor).toEqual(['#FF6384', '#36A2EB', '#FFCE56']);
      expect(chartData.datasets[0].hoverBackgroundColor).toEqual(['#FF6384', '#36A2EB', '#FFCE56']);
    });
  });
});

