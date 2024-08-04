import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Roles from '../Components/admin/Roles';
import roleReducer from '../slices/roleSlice/requestRoleSlice';
import { useGetRolesQuery, useDeleteRoleMutation } from '../slices/roleSlice/requestroleApiSlice';

// Mocking API hooks
vi.mock('../slices/roleSlice/requestroleApiSlice', () => ({
  useGetRolesQuery: vi.fn(),
  useDeleteRoleMutation: vi.fn(),
}));

vi.mock('../Components/Spinners', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      roles: roleReducer,
    },
    preloadedState: initialState,
  });
};

describe('Roles Component', () => {
  const mockRolesData = {
    roles: [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' },
    ],
  };

  beforeEach(() => {
    useGetRolesQuery.mockReturnValue({
      data: mockRolesData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    useDeleteRoleMutation.mockReturnValue([vi.fn()]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render Spinner while loading', () => {
    useGetRolesQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Roles />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

 

  it('should render the table with roles when data is available', async () => {
    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Roles />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Role ID')).toBeInTheDocument();
    expect(screen.getByText('Role Name')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('should dispatch setRoleInfo when data is fetched', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Roles />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().roles.roleInfo).toEqual(mockRolesData);
    });
  });


  it('should handle pagination correctly', async () => {
    const mockPaginatedRolesData = {
      roles: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
      })),
    };

    useGetRolesQuery.mockReturnValue({
      data: mockPaginatedRolesData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Roles />
        </MemoryRouter>
      </Provider>
    );

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`Role ${i}`)).toBeInTheDocument();
    }

    const page2Button = screen.getAllByRole('button').find(button => button.textContent === '2');
    fireEvent.click(page2Button!);

    await waitFor(() => {
      for (let i = 11; i <= 20; i++) {
        expect(screen.getByText(`Role ${i}`)).toBeInTheDocument();
      }
    });
  });
});
