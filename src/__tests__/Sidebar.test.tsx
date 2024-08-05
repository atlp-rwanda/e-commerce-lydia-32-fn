import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Sidebar from '../Components/admin/Sidebar';
import authReducer, { logOut } from '../slices/authSlice/authSlice';
import { useLogoutMutation } from '../slices/authSlice/authApiSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

vi.mock('../slices/authSlice/authApiSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLogoutMutation: vi.fn(),
  };
});

describe('Sidebar Component', () => {
  let mockLogout: any;
  let store: any;
  const mockToggleSidebar = vi.fn();

  beforeEach(() => {
    mockLogout = vi.fn().mockResolvedValue({});

    useLogoutMutation.mockReturnValue([mockLogout, { isLoading: false }]);
    store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar isOpen={true} toggleSidebar={mockToggleSidebar} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render Sidebar with links', () => {
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });

  it('should toggle Roles dropdown', () => {
    const rolesToggle = screen.getByText('Roles');
    fireEvent.click(rolesToggle);
    expect(screen.getByText('Create role')).toBeInTheDocument();
    fireEvent.click(rolesToggle);
    expect(screen.queryByText('Create role')).not.toBeInTheDocument();
  });

  it('should toggle Permissions dropdown', () => {
    const permissionsToggle = screen.getByText('Permissions');
    fireEvent.click(permissionsToggle);
    expect(screen.getByText('Create permission')).toBeInTheDocument();
    fireEvent.click(permissionsToggle);
    expect(screen.queryByText('Create permission')).not.toBeInTheDocument();
  });


});
