import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import WebsiteStatistics from '../Components/admin/WebsiteStatistics';
import { Line } from 'react-chartjs-2';

// Mock the Line component from react-chartjs-2
vi.mock('react-chartjs-2', () => ({
  Line: vi.fn(() => <canvas data-testid="chart"></canvas>),
}));

describe('WebsiteStatistics Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<WebsiteStatistics />);
    
    const heading = screen.getByText('Website Statistics');
    expect(heading).toBeInTheDocument();

    const chart = screen.getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });

  it('should pass correct data to Line chart', () => {
    const expectedData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Website Traffic',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    render(<WebsiteStatistics />);
    
    expect(Line).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
      }),
      {}
    );
  });

  it('should match snapshot', () => {
    const { container } = render(<WebsiteStatistics />);
    expect(container).toMatchSnapshot();
  });
});
