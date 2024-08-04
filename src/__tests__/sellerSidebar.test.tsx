import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import SellerSidebar from '../Components/seller/sellerSidebar';
import authReducer from '../slices/authSlice/authSlice';
import '@testing-library/jest-dom';  

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const renderComponent = (isOpen: boolean) => {
  return render(
    <Provider store={store}>
      <Router>
        <SellerSidebar isOpen={isOpen} setIsOpen={() => {}} />
      </Router>
    </Provider>
  );
};

describe('SellerSidebar Component', () => {
  test('should render the SellerSidebar component when open', () => {
    renderComponent(true);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Add Product')).toBeInTheDocument();
    expect(screen.getByText('Go Shopping')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });



  test('should handle logout', () => {
    renderComponent(true);

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);
  });

  test('should navigate to correct page when link is clicked', () => {
    renderComponent(true);

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

  });
});
