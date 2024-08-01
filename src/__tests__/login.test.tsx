import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../pages/Login';
import { useLoginMutation } from '../slices/authSlice/authApiSlice';

// Mock the necessary modules
vi.mock('react-hot-toast', () => ({
  error: vi.fn(),
  success: vi.fn(),
}));

vi.mock('../slices/authSlice/authApiSlice', () => ({
  useLoginMutation: () => [vi.fn(), { isLoading: false }],
  useLoginByGoogleMutation: () => [vi.fn(), { isLoading: false }],
  useLoginTwoFaMutation: () => [vi.fn(), { isLoading: false }],
}));

// Create a simple mock store
const mockStore = configureStore({
  reducer: {
    auth: (state = { userInfo: null }, action) => state,
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <GoogleOAuthProvider clientId="your-client-id">
        <BrowserRouter>{ui}</BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('allows email input', () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('allows password input', () => {
    renderWithProviders(<Login />);
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('renders Google sign-in button', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/LOST YOUR PASSWORD?/i)).toHaveAttribute('href', '/forgot-password');
  });

  it('renders register link', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/REGISTER/i)).toHaveAttribute('href', '/register');
  });
});