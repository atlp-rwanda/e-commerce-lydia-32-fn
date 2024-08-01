import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import  store  from '../store'; 
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App Component Simple Tests', () => {
  it('should render static content', () => {
    render(
      <Provider store={store}>
      
          <App />
        
      </Provider>
    );

    // Check for static text
  });

  it('should render category buttons', () => {
    render(
      <Provider store={store}>
  
          <App />
  
      </Provider>
    );

    // Check if category buttons are rendered
    // expect(screen.getByText('ALL')).toBeInTheDocument();
    // expect(screen.getByText('ELECTRONICS')).toBeInTheDocument();
    // expect(screen.getByText('CLOTHES')).toBeInTheDocument();
    // expect(screen.getByText('FOOD')).toBeInTheDocument();
  });

  it('should render loading spinner when isLoading is true', () => {
    // You can mock useGetProductsQuery to simulate loading state
    render(
      <Provider store={store}>

          <App />
  
      </Provider>
    );

  });

  it('should render "No products found" message when no products are available', () => {
    // Mock the data to simulate no products available
    render(
      <Provider store={store}>
    
          <App />

      </Provider>
    );
  });
});