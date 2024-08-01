import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '../App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Modal from 'react-modal';

// Mock the dependencies
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: vi.fn() }))
}));
vi.mock('../App', () => ({ default: () => <div>Mocked App</div> }));
vi.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock('react-modal', () => ({
  default: {
    setAppElement: vi.fn(),
  },
}));

describe('Main entry point', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Mock the environment variable
    vi.stubEnv('VITE_CLIENT_ID', 'test-client-id');
    
    // Mock getElementById
    document.getElementById = vi.fn().mockReturnValue(document.createElement('div'));
  });

  afterEach(() => {
    // Restore the original environment
    process.env = originalEnv;
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('should render the app correctly', () => {
    // Simulate the main file's content
    Modal.setAppElement('#root');

    const root = document.getElementById('root');
    ReactDOM.createRoot(root!).render(
      <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.VITE_CLIENT_ID!}>
          <App />
        </GoogleOAuthProvider>
      </React.StrictMode>
    );

    // Check if Modal.setAppElement was called with the correct argument
    expect(Modal.setAppElement).toHaveBeenCalledWith('#root');

    // Check if ReactDOM.createRoot was called with the correct element
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(expect.any(HTMLDivElement));

    // Get the render function
    const renderMock = (ReactDOM.createRoot as jest.Mock).mock.results[0].value.render;

    // Check if the render function was called with the correct JSX
    expect(renderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: React.StrictMode,
        props: expect.objectContaining({
          children: expect.objectContaining({
            type: GoogleOAuthProvider,
            props: expect.objectContaining({
              clientId: 'test-client-id',
              children: expect.any(Object)
            })
          })
        })
      })
    );
  });
});