import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationIcon from '../Components/NotificationIcon';
import { vi } from 'vitest';

// Mock FontAwesomeIcon component
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <div data-testid="mock-icon" />
}));

describe('NotificationIcon Component', () => {
  test('renders FontAwesomeIcon', () => {
    render(<NotificationIcon count={0} />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('does not render count when count is 0', () => {
    render(<NotificationIcon count={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  test('renders count when count is greater than 0', () => {
    render(<NotificationIcon count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('applies correct CSS classes for count badge', () => {
    render(<NotificationIcon count={3} />);
    const badge = screen.getByText('3');
    expect(badge).toHaveClass('absolute', 'top-0', 'right-0', 'inline-flex', 'items-center', 'justify-center', 'px-2', 'py-1', 'text-xs', 'font-bold', 'leading-none', 'text-red-100', 'transform', 'translate-x-1/2', '-translate-y-1/2', 'bg-red-600', 'rounded-full');
  });
});