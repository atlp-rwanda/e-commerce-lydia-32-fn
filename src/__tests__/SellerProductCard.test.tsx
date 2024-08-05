import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import SellerProductCard from '../Components/SellerProductCard';
import { Edit, Trash } from 'lucide-react';

describe('SellerProductCard Component', () => {
  const product = {
    productId: 1,
    images: 'https://via.placeholder.com/150',
    productName: 'Test Product',
    description: 'Test Description',
    price: 10.0,
    quantity: 5,
  };
  const onDelete = vi.fn();
  const isDeleting = false;

  const renderComponent = () => {
    render(
      <Router>
        <SellerProductCard product={product} onDelete={onDelete} isDeleting={isDeleting} />
      </Router>
    );
  };

  it('renders correctly with product details', () => {
    renderComponent();

    expect(screen.getByText(product.productName)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`Qty: ${product.quantity}`)).toBeInTheDocument();
    expect(screen.getByAltText(product.productName)).toHaveAttribute('src', product.images);
  });

  it('navigates to product detail page on click', () => {
    renderComponent();

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/seller/product/${product.productId}`);
  });

 

  it('disables the delete button when isDeleting is true', () => {
    render(
      <Router>
        <SellerProductCard product={product} onDelete={onDelete} isDeleting={true} />
      </Router>
    );

    const deleteButton = screen.getByRole('button', { name: '...' });
    expect(deleteButton).toBeDisabled();
  });
});
