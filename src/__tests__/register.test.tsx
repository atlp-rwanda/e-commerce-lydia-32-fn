import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignupForm from '../pages/Register';
import { useUserRegisterMutation, useRegisterByGoogleMutation } from '../slices/authSlice/authApiSlice';

// Mock the necessary modules
vi.mock('react-hot-toast', () => ({
  error: vi.fn(),
  success: vi.fn(),
}));

vi.mock('../slices/authSlice/authApiSlice', () => ({
  useUserRegisterMutation: () => [vi.fn(), { isLoading: false }],
  useRegisterByGoogleMutation: () => [vi.fn(), { isLoading: false }],
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

describe('SignupForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders signup form', () => {
    renderWithProviders(<SignupForm />);
    expect(screen.getByPlaceholderText('first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('other name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Street')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('State')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Postal code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('allows input for all fields', () => {
    renderWithProviders(<SignupForm />);
    const inputFields = [
      { placeholder: 'first name', value: 'John' },
      { placeholder: 'other name', value: 'Doe' },
      { placeholder: 'Email', value: 'john@example.com' },
      { placeholder: 'Password', value: 'password123' },
      { placeholder: 'Street', value: '123 Main St' },
      { placeholder: 'City', value: 'Anytown' },
      { placeholder: 'Phone Number', value: '1234567890' },
      { placeholder: 'State', value: 'State' },
      { placeholder: 'Postal code', value: '12345' },
      { placeholder: 'Country', value: 'Country' },
    ];

    inputFields.forEach(field => {
      const input = screen.getByPlaceholderText(field.placeholder) as HTMLInputElement;
      fireEvent.change(input, { target: { value: field.value } });
      expect(input.value).toBe(field.value);
    });
  });

//   it('submits form with user details', async () => {
//     const mockRegister = vi.fn().mockResolvedValue({});
//     vi.mocked(useUserRegisterMutation).mockReturnValue([mockRegister, { isLoading: false }]);

//     renderWithProviders(<SignupForm />);
    
//     const inputFields = [
//       { placeholder: 'first name', value: 'John' },
//       { placeholder: 'other name', value: 'Doe' },
//       { placeholder: 'Email', value: 'john@example.com' },
//       { placeholder: 'Password', value: 'password123' },
//       { placeholder: 'Street', value: '123 Main St' },
//       { placeholder: 'City', value: 'Anytown' },
//       { placeholder: 'Phone Number', value: '1234567890' },
//       { placeholder: 'State', value: 'State' },
//       { placeholder: 'Postal code', value: '12345' },
//       { placeholder: 'Country', value: 'Country' },
//     ];

//     inputFields.forEach(field => {
//       fireEvent.change(screen.getByPlaceholderText(field.placeholder), { target: { value: field.value } });
//     });

//     fireEvent.click(screen.getByRole('button', { name: /register/i }));

//     await waitFor(() => {
//       expect(mockRegister).toHaveBeenCalledWith({
//         firstname: 'John',
//         othername: 'Doe',
//         email: 'john@example.com',
//         password: 'password123',
//         phone: '1234567890',
//         street: '123 Main St',
//         city: 'Anytown',
//         country: 'Country',
//         state: 'State',
//         postal_code: '12345',
//       });
//     });
//   });

  it('renders Google sign-up button', () => {
    renderWithProviders(<SignupForm />);
    expect(screen.getByText(/Sign up with Google/i)).toBeInTheDocument();
  });

  it('renders login link', () => {
    renderWithProviders(<SignupForm />);
    expect(screen.getByText(/LOGIN/i)).toHaveAttribute('href', '/login');
  });
});