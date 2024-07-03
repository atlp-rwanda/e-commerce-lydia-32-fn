import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import TestComponent from '../Components/testComponent';

test('renders the component with the correct title', () => {
  const title = 'Test Title';
  render(<TestComponent title={title} />);
  const titleElement = screen.getByText(title);
  expect(titleElement).toBeInTheDocument();
});

test('renders the component with static text', () => {
  render(<TestComponent title="Test Title" />);
  const staticText = screen.getByText('This is a Test component.');
  expect(staticText).toBeInTheDocument();
});
