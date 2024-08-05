import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import Permissions from '../Components/admin/Permissions';
import permissionReducer from '../slices/permissionSlice/permissionSlice';
import { useGetPermissionsQuery, useDeletePermissionMutation } from '../slices/permissionSlice/permissionApiSlice';

vi.mock('../slices/permissionSlice/permissionApiSlice', () => ({
  useGetPermissionsQuery: vi.fn(),
  useDeletePermissionMutation: vi.fn(),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      permissions: permissionReducer,
    },
    preloadedState: initialState,
  });
};

vi.mock('../Components/Spinners', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe('Permissions Component', () => {
  const mockPermissionsData = {
    permissions: [
      { id: 1, name: 'Permission 1' },
      { id: 2, name: 'Permission 2' },
    ],
  };

  beforeEach(() => {
    useGetPermissionsQuery.mockReturnValue({
      data: mockPermissionsData,
      error: null,
      refetch: vi.fn(),
    });

    const mockDeletePermission = vi.fn().mockResolvedValue({});
    useDeletePermissionMutation.mockReturnValue([mockDeletePermission]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render Spinner while loading', () => {
    useGetPermissionsQuery.mockReturnValue({
      data: null,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <Permissions />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the table with permissions when data is available', async () => {
    render(
      <Provider store={createMockStore()}>
        <Permissions />
      </Provider>
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Permission 1')).toBeInTheDocument();
    expect(screen.getByText('Permission 2')).toBeInTheDocument();
  });

  it('should dispatch setPermissionInfo when data is fetched', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Permissions />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().permissions.permissionInfo).toEqual(mockPermissionsData);
    });
  });

  it('should delete a permission and refetch the list', async () => {
    const mockDeletePermission = vi.fn().mockResolvedValue({});
    const mockRefetch = vi.fn();

    useGetPermissionsQuery.mockReturnValue({
      data: mockPermissionsData,
      error: null,
      refetch: mockRefetch,
    });

    useDeletePermissionMutation.mockReturnValue([mockDeletePermission]);

    render(
      <Provider store={createMockStore()}>
        <Permissions />
      </Provider>
    );

    const deleteButtons = screen.getAllByRole('button');

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockDeletePermission).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
