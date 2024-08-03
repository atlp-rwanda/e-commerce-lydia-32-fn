// src/__tests__/wishlistEmpty.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WishlistEmpty from '../Components/wishlistEmpty';

describe('WishlistEmpty Component', () => {
  it('should render the WishlistEmpty component', () => {
    render(<WishlistEmpty />);

    expect(screen.getByText('WISHLIST')).toBeInTheDocument();
    expect(screen.getByText('No Items in your wishlist')).toBeInTheDocument();
  });
});
