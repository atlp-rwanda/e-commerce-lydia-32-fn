import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ForgotPassword from '../Components/ForgotPassword';
import toast from 'react-hot-toast';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock fetch
global.fetch = vi.fn();

describe('ForgotPassword component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    expect(getByText('Reset your password')).toBeDefined();
    expect(getByPlaceholderText('Enter your email')).toBeDefined();
    expect(getByText('Reset Password')).toBeDefined();
  });

  it('updates email input value', () => {
    const { getByPlaceholderText } = render(<ForgotPassword />);
    const input = getByPlaceholderText('Enter your email') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  it('shows error toast for invalid email', async () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    const input = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Reset Password');
  
    fireEvent.change(input, { target: { value: 'test@test' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please enter a valid email address');
    });
  });

  it('submits form with valid email', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ message: 'Success' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    const input = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Reset Password');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://team-lydia-demo.onrender.com/api/forgot',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com' }),
        })
      );
      expect(toast.success).toHaveBeenCalledWith('Success');
    });
  });

  it('handles API error', async () => {
    const mockResponse = { ok: false, json: () => Promise.resolve({ error: 'API Error' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    const input = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Reset Password');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('API Error');
    });
  });

  it('handles network error', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    const input = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Reset Password');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Network error, please try again later');
    });
  });

  it('disables button during form submission', async () => {
    const mockResponse = { ok: true, json: () => new Promise(resolve => setTimeout(() => resolve({ message: 'Success' }), 100)) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
  
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);
    const input = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Reset Password');
  
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
  
    expect(submitButton.getAttribute('disabled')).not.toBeNull();
    expect(submitButton.textContent).toBe('Sending...');
  
    await waitFor(() => {
      expect(submitButton.getAttribute('disabled')).toBeNull();
      expect(submitButton.textContent).toBe('Reset Password');
    });
  });
});