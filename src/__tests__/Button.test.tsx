import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button, ButtonProps } from '../Components/Button';

describe('Button component', () => {
  const defaultProps: ButtonProps = {
    label: 'Click me',
    onClick: vi.fn(),
  };

  it('renders with default props', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeDefined();
    expect(buttonElement.classList.contains('storybook-button--medium')).toBe(true);
    expect(buttonElement.classList.contains('storybook-button--secondary')).toBe(true);
  });

  it('renders with primary prop', () => {
    const { getByText } = render(<Button {...defaultProps} primary />);
    const buttonElement = getByText('Click me');
    expect(buttonElement.classList.contains('storybook-button--primary')).toBe(true);
  });

  it('renders with different sizes', () => {
    const { getByText, rerender } = render(<Button {...defaultProps} size="small" />);
    let buttonElement = getByText('Click me');
    expect(buttonElement.classList.contains('storybook-button--small')).toBe(true);

    rerender(<Button {...defaultProps} size="large" />);
    buttonElement = getByText('Click me');
    expect(buttonElement.classList.contains('storybook-button--large')).toBe(true);
  });

  it('applies custom background color', () => {
    const { getByText } = render(<Button {...defaultProps} backgroundColor="#ff0000" />);
    const buttonElement = getByText('Click me');
    expect(buttonElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    const { getByText } = render(<Button {...defaultProps} onClick={onClickMock} />);
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});