import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../Components/product';

const mockProduct = {
  productId: 1,
  images: ['https://via.placeholder.com/150'],
  productName: 'Test Product',
  price: 12345,
  description: 'This is a test product description.',
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ProductCard Component', () => {
  test('renders product name', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('renders product price', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Rwf 12,345')).toBeInTheDocument();
  });

  test('renders product description', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText('This is a test product description.')).toBeInTheDocument();
  });

  test('renders image with correct src and alt attributes', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const img = screen.getByAltText('Test Product');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  test('renders link with correct href', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/singleProduct/1');
  });
});
