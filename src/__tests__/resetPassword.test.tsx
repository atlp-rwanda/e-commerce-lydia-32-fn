import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ResetPassword from '../Components/ResetPassword';
import toast from 'react-hot-toast';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      search: '?token=validtoken'
    }),
    useNavigate: () => vi.fn()
  };
});

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn()
  }
}));

// Mock fetch
global.fetch = vi.fn();

describe('ResetPassword component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<BrowserRouter><ResetPassword /></BrowserRouter>);
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeDefined();
    expect(screen.getByPlaceholderText('Enter new password')).toBeDefined();
    expect(screen.getByPlaceholderText('Confirm new password')).toBeDefined();
  });

  it('shows error when passwords do not match', async () => {
    render(<BrowserRouter><ResetPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'Password456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    expect(toast.error).toHaveBeenCalledWith('Passwords do not match.');
  });

  it('shows error for invalid password format', async () => {
    render(<BrowserRouter><ResetPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    expect(toast.error).toHaveBeenCalledWith('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.');
  });

  it('submits form with valid password', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ message: 'Password reset successful' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    render(<BrowserRouter><ResetPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'ValidPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'ValidPassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://team-lydia-demo.onrender.com/api/reset?token=validtoken',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'ValidPassword123' }),
        })
      );
      expect(toast.success).toHaveBeenCalledWith('Password reset successful');
    });
  });

  it('handles API error', async () => {
    const mockResponse = { ok: false, json: () => Promise.resolve({ error: 'API Error' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    render(<BrowserRouter><ResetPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'ValidPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'ValidPassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('API Error');
    });
  });

  it('handles network error', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<BrowserRouter><ResetPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'ValidPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'ValidPassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Network error, please try again later');
    });
  });
  
  it('disables button during form submission', async () => {
    const mockResponse = { ok: true, json: () => new Promise(resolve => setTimeout(() => resolve({ message: 'Success' }), 100)) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
  
    render(<BrowserRouter><ResetPassword /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('Enter new password'), { target: { value: 'ValidPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm new password'), { target: { value: 'ValidPassword123' } });
    
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });
    fireEvent.click(submitButton);
  
    expect(submitButton.disabled).toBe(true);
    expect(submitButton.textContent).toBe('Resetting...');
  
    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
      expect(submitButton.textContent).toBe('Reset Password');
    });
});
});