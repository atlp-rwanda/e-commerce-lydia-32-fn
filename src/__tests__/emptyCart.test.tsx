import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import EmptyCart from '../Components/EmptyCart';

describe('EmptyCart Component', () => {
  beforeEach(() => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        user: {
          firstname: 'John',
          email: 'john@example.com',
        },
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render the EmptyCart component with user info', () => {
    render(
      <BrowserRouter>
        <EmptyCart />
      </BrowserRouter>
    );

    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();

    const message = screen.getByText('Dear', { exact: false });
    expect(within(message).getByText('John')).toBeInTheDocument();
    expect(within(message).getByText('currently your shopping cart is empty.', { exact: false })).toBeInTheDocument();

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should render the EmptyCart component without user info', () => {
    localStorage.removeItem('userInfo');
    render(
      <BrowserRouter>
        <EmptyCart />
      </BrowserRouter>
    );

    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
    
    const message = screen.getByText('Dear', { exact: false });
    expect(within(message).getByText('currently your shopping cart is empty.', { exact: false })).toBeInTheDocument();
    
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
