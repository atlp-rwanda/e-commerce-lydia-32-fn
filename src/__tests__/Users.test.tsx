import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Users from '../Components/admin/Users';
import userReducer from '../slices/usersSlice/userSlice';
import { useGetAllUsersQuery, useBlockUserMutation } from '../slices/usersSlice/userApiSlice';

vi.mock('../slices/usersSlice/userApiSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAllUsersQuery: vi.fn(),
    useBlockUserMutation: vi.fn(),
  };
});
vi.mock('../components/Spinners', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      users: userReducer,
    },
    preloadedState: initialState,
  });
};

describe('Users Component', () => {
  const mockUsersData = {
    users: [
      { id: 1, firstname: 'John', email: 'john@example.com', roleId: 1, isBlocked: false },
      { id: 2, firstname: 'Jane', email: 'jane@example.com', roleId: 2, isBlocked: false },
    ],
  };

  beforeEach(() => {
    (useGetAllUsersQuery as vi.Mock).mockReturnValue({
      data: mockUsersData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    (useBlockUserMutation as vi.Mock).mockReturnValue([vi.fn().mockResolvedValue({}), { isLoading: false, error: null }]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should filter users based on search term', async () => {
    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Search users...'), { target: { value: 'john' } });
    expect(screen.getByText('John')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search users...'), { target: { value: 'doesnotexist' } });
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

 

 
});
