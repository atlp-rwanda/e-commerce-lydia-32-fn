// src/_tests_/Header.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Components/admin/Header'; // Adjust the import path as necessary
import { vi, describe, it, expect } from 'vitest';

// Mock Redux state
const initialState = {
  auth: {
    userInfo: {
      user: {
        firstname: 'John',
      },
    },
  },
};

const reducer = (state = initialState, action: any) => state;
const store = createStore(reducer);

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Header', () => {


  it('should call toggleSidebar when the button is clicked', () => {
    const toggleSidebar = vi.fn();
    renderWithProviders(<Header toggleSidebar={toggleSidebar} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleSidebar).toHaveBeenCalled();
  });

  
});