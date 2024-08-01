import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import App from '../App';

// Mock modules
vi.mock('react-router-dom', () => {
  return {
    Route: vi.fn(),
    createBrowserRouter: vi.fn(() => ({ routes: [] })),
    createRoutesFromElements: vi.fn(() => ({ routes: [] })),
    RouterProvider: vi.fn(({ children }) => <div>{children}</div>),
    Link: vi.fn(({ children }) => <a>{children}</a>),
  };
});

vi.mock('react-redux', () => ({
  Provider: ({ children }) => <div>{children}</div>,
}));

vi.mock('../store', () => ({
  default: {},
}));

vi.mock('../contexts/notificationContext', () => ({
  NotificationProvider: ({ children }) => <div>{children}</div>,
}));


describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(true).toBeTruthy();
  });

});
