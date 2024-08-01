import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../pages/Checkout';
import { useBuyerPlaceOrderMutation } from '../slices/orderSlice/orderApiSlice';
import { useGetCartQuery } from '../slices/cartSlice/cartApiSlice';
import { useNewPaymentMutation } from '../slices/paymentSlice/paymentApiSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import paymentSlice from '../slices/paymentSlice/paymentSlice';
import { vi } from 'vitest';
import toast from 'react-hot-toast';

// Mock the Redux hooks
vi.mock('../slices/orderSlice/orderApiSlice');
vi.mock('../slices/cartSlice/cartApiSlice');
vi.mock('../slices/paymentSlice/paymentApiSlice');
vi.mock('../slices/productSlice/productApiSlice');

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockStore = configureStore({
  reducer: {
    payment: paymentSlice,
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('Checkout Component', () => {
  let mockPlaceOrder: any;
  let mockNewPayment: any;

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock localStorage and sessionStorage
    Storage.prototype.getItem = vi.fn(() => JSON.stringify({ token: 'fake-token' }));
    Storage.prototype.setItem = vi.fn();

    // Mock the API calls
    (useGetCartQuery as any).mockReturnValue({
      data: { items: [{ productId: 1, quantity: 2 }], total: 100 },
      isLoading: false,
    });
    (useGetProductsQuery as any).mockReturnValue({
      data: { products: [{ productId: 1, productName: 'Test Product', price: 50 }] },
      isLoading: false,
    });

    mockPlaceOrder = vi.fn().mockResolvedValue({ order: { orderId: '123' } });
    mockNewPayment = vi.fn().mockResolvedValue({ data: { sessionUrl: 'fake-url', sessionId: 'fake-session-id' } });

    (useBuyerPlaceOrderMutation as any).mockReturnValue([mockPlaceOrder, { isLoading: false }]);
    (useNewPaymentMutation as any).mockReturnValue([mockNewPayment, { isLoading: false }]);
  });

  test('renders checkout form', async () => {
    renderWithProviders(<Checkout />);
    await waitFor(() => {
      expect(screen.getByText('Order Summary')).toBeDefined();
      expect(screen.getByText('Please Fill Out This Form To Continue')).toBeDefined();
    });
  });

  test('displays cart items and total', async () => {
    renderWithProviders(<Checkout />);
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeDefined();
      expect(screen.getByText('Rwf 50 (X2)')).toBeDefined();
      const totalPriceElements = screen.getAllByText('Rwf 100.00');
      expect(totalPriceElements.length).toBeGreaterThan(0);
    });
  });

  test('validates form fields', async () => {
    renderWithProviders(<Checkout />);

    const submitButton = screen.getByRole('button', { name: /confirm order/i });
    fireEvent.click(submitButton);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const errorChecks = [
      { name: 'Payment Method', text: 'payment method' },
      { name: 'Street Address', text: 'street address' },
      { name: 'City', text: 'city' },
      { name: 'Country', text: 'country' }
    ];

    for (const check of errorChecks) {
      const errorElements = screen.queryAllByText((content, element) => {
        return element?.textContent?.toLowerCase().includes(check.text) || false;
      });

      const errorElement = errorElements.find(el =>
        el.tagName !== 'OPTION' && el.tagName !== 'SELECT'
      );

      expect(errorElement).not.toBeNull();
      if (errorElement) {
        expect(errorElement.textContent).toMatch(new RegExp(check.text, 'i'));
      }
    }
  });

  test('submits form with valid data', async () => {
    renderWithProviders(<Checkout />);

    fireEvent.change(screen.getByTestId('payment-method'), { target: { value: 'stripe' } });
    fireEvent.change(screen.getByTestId('street'), { target: { value: '123 Test St' } });
    fireEvent.change(screen.getByTestId('city'), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByTestId('country'), { target: { value: 'Test Country' } });

    const submitButton = screen.getByRole('button', { name: /confirm order/i });
    fireEvent.click(submitButton);

    

    await waitFor(() => {
      expect(mockPlaceOrder).toHaveBeenCalled();
    });
  });

  test('handles payment initialization failure', async () => {
    mockNewPayment.mockRejectedValue(new Error('Payment initialization failed'));

    renderWithProviders(<Checkout />);

    fireEvent.change(screen.getByTestId('payment-method'), { target: { value: 'stripe' } });
    fireEvent.change(screen.getByTestId('street'), { target: { value: '123 Test St' } });
    fireEvent.change(screen.getByTestId('city'), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByTestId('country'), { target: { value: 'Test Country' } });

    const submitButton = screen.getByRole('button', { name: /confirm order/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPlaceOrder).toHaveBeenCalled();
    });

   await new Promise(resolve => setTimeout(resolve, 100));
    expect(toast.error).toHaveBeenCalledWith('Failed to place order. Please try again.');
  });
});
