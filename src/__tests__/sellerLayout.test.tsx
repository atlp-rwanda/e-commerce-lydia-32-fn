
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SellerLayout from '../layouts/SellerLayout';

// Mock the required components and modules
vi.mock('../Components/navbar', () => ({ default: () => <div data-testid="navbar">Navbar</div> }));
vi.mock('../Components/footer', () => ({ default: () => <div data-testid="footer">Footer</div> }));
vi.mock('react-hot-toast', () => ({ Toaster: () => <div data-testid="toaster">Toaster</div> }));
vi.mock('react-toastify', () => ({ ToastContainer: () => <div data-testid="toast-container">ToastContainer</div> }));
vi.mock('../pages/Chat', () => ({ default: () => <div data-testid="chat-room">ChatRoom</div> }));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    Outlet: () => <div data-testid="outlet">Outlet</div>,
  };
});

import { useLocation } from 'react-router-dom';

describe('SellerLayout component', () => {
  it('renders with navbar and footer for non-login pages', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/dashboard' } as any);
    
    const { getByTestId } = render(
      <BrowserRouter>
        <SellerLayout />
      </BrowserRouter>
    );

    expect(getByTestId('navbar')).toBeDefined();
    expect(getByTestId('footer')).toBeDefined();
    expect(getByTestId('toaster')).toBeDefined();
    expect(getByTestId('toast-container')).toBeDefined();
    expect(getByTestId('chat-room')).toBeDefined();
    expect(getByTestId('outlet')).toBeDefined();
  });

  it('does not render navbar and footer for login page', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/login' } as any);
    
    const { queryByTestId, getByTestId } = render(
      <BrowserRouter>
        <SellerLayout />
      </BrowserRouter>
    );

    expect(queryByTestId('navbar')).toBeNull();
    expect(queryByTestId('footer')).toBeNull();
    expect(getByTestId('toaster')).toBeDefined();
    expect(getByTestId('toast-container')).toBeDefined();
    expect(getByTestId('chat-room')).toBeDefined();
    expect(getByTestId('outlet')).toBeDefined();
  });

  it('does not render navbar and footer for register page', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/register' } as any);
    
    const { queryByTestId, getByTestId } = render(
      <BrowserRouter>
        <SellerLayout />
      </BrowserRouter>
    );

    expect(queryByTestId('navbar')).toBeNull();
    expect(queryByTestId('footer')).toBeNull();
    expect(getByTestId('outlet')).toBeDefined();
  });

  it('does not render navbar and footer for verified page', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/verified' } as any);
    
    const { queryByTestId, getByTestId } = render(
      <BrowserRouter>
        <SellerLayout />
      </BrowserRouter>
    );

    expect(queryByTestId('navbar')).toBeNull();
    expect(queryByTestId('footer')).toBeNull();
    expect(getByTestId('outlet')).toBeDefined();
  });

  it('does not render navbar and footer for verification failed page', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/verification/failed' } as any);
    
    const { queryByTestId, getByTestId } = render(
      <BrowserRouter>
        <SellerLayout />
      </BrowserRouter>
    );

    expect(queryByTestId('navbar')).toBeNull();
    expect(queryByTestId('footer')).toBeNull();
    expect(getByTestId('outlet')).toBeDefined();
  });
});