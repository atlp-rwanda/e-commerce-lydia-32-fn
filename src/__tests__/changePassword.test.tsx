import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ChangePassword from '../pages/changePassword';
import * as userApiSlice from '../slices/authSlice/authApiSlice';
import * as authSlice from '../slices/authSlice/authSlice';
import toast from 'react-hot-toast';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Setup
const mockStore = configureStore({
  reducer: {
    auth: (state = { userInfo: { passwordExpired: true } }) => state,
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('ChangePassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    renderWithProviders(<ChangePassword />);
    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });

 



  it('handles form submission with non-matching passwords', async () => {
    renderWithProviders(<ChangePassword />);

    fireEvent.change(screen.getByPlaceholderText('Current Password'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newpass' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm New Password'), { target: { value: 'differentpass' } });

    fireEvent.click(screen.getByText('Update Password'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('New passwords do not match');
    });
  });

  it('handles API errors', async () => {
    const mockError = { data: { message: 'An error occurred. Please try again.' } };
    const mockChangePassword = vi.fn().mockRejectedValue(mockError);
    vi.spyOn(userApiSlice, 'useChangePasswordMutation').mockReturnValue([mockChangePassword]);

    renderWithProviders(<ChangePassword />);

    fireEvent.change(screen.getByPlaceholderText('Current Password'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newpass' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm New Password'), { target: { value: 'newpass' } });

    fireEvent.click(screen.getByText('Update Password'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred. Please try again.');
    });
  });


});