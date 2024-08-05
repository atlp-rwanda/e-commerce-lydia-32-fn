import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Layout from '../layouts/sellerDashboardLayout';

vi.mock('../Components/seller/sellerDashboardNavbar', () => ({
  default: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <div data-testid="seller-dashboard-navbar">
      <button onClick={toggleSidebar} data-testid="toggle-sidebar-btn">Toggle Sidebar</button>
    </div>
  ),
}));

vi.mock('../Components/seller/sellerSidebar', () => ({
  default: ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => (
    <div data-testid="seller-sidebar" data-isopen={isOpen}>
      Sidebar
    </div>
  ),
}));

vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
}));

describe('Layout component', () => {
  it('renders children', () => {
    render(
      <Layout>
        <div data-testid="child-component">Child Component</div>
      </Layout>
    );

    expect(screen.getByTestId('child-component')).toBeDefined();
  });

  it('renders SellerDashboardNavbar', () => {
    render(<Layout>Content</Layout>);

    expect(screen.getByTestId('seller-dashboard-navbar')).toBeDefined();
  });

  it('renders SellerSidebar', () => {
    render(<Layout>Content</Layout>);

    expect(screen.getByTestId('seller-sidebar')).toBeDefined();
  });

  it('renders Toaster', () => {
    render(<Layout>Content</Layout>);

    expect(screen.getByTestId('toaster')).toBeDefined();
  });

  it('toggles sidebar when navbar button is clicked', () => {
    render(<Layout>Content</Layout>);

    const sidebarBeforeClick = screen.getByTestId('seller-sidebar');
    expect(sidebarBeforeClick.getAttribute('data-isopen')).toBe('false');

    const toggleButton = screen.getByTestId('toggle-sidebar-btn');
    fireEvent.click(toggleButton);

    const sidebarAfterClick = screen.getByTestId('seller-sidebar');
    expect(sidebarAfterClick.getAttribute('data-isopen')).toBe('true');
  });
});