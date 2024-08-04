import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationDialog from '../Components/ConfirmationDialog';

describe('ConfirmationDialog Component', () => {
  const message = 'Are you sure you want to proceed?';
  const onConfirm = vi.fn();
  const onCancel = vi.fn();

  it('renders correctly with the given message', () => {
    render(<ConfirmationDialog message={message} onConfirm={onConfirm} onCancel={onCancel} />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('calls onCancel when No button is clicked', () => {
    render(<ConfirmationDialog message={message} onConfirm={onConfirm} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText('No'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when Yes button is clicked', () => {
    render(<ConfirmationDialog message={message} onConfirm={onConfirm} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText('Yes'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
