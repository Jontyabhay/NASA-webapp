import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MarsCameraUsage from './MarsCameraUsage';

// nasa-app/frontend/src/components/MarsCameraUsage.test.js

// Mock react-chartjs-2 Pie chart
jest.mock('react-chartjs-2', () => ({
  Pie: ({ data }) => (
    <div data-testid="mock-pie">
      {JSON.stringify(data)}
    </div>
  ),
}));

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ FHAZ: 10, RHAZ: 5, NAVCAM: 15 }),
    })
  );
  mockNavigate.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders loading state initially', async () => {
  render(<MarsCameraUsage />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
});

test('renders pie chart with fetched data', async () => {
  render(<MarsCameraUsage />);
  await waitFor(() => screen.getByTestId('mock-pie'));
  expect(screen.getByTestId('mock-pie')).toHaveTextContent('FHAZ');
  expect(screen.getByTestId('mock-pie')).toHaveTextContent('RHAZ');
  expect(screen.getByTestId('mock-pie')).toHaveTextContent('NAVCAM');
});

test('updates chart when sol input is changed and form submitted', async () => {
  render(<MarsCameraUsage />);
  await waitFor(() => screen.getByTestId('mock-pie'));
  const input = screen.getByLabelText(/enter sol/i);
  fireEvent.change(input, { target: { value: '1234' } });
  fireEvent.click(screen.getByText(/show/i));
  expect(global.fetch).toHaveBeenLastCalledWith('http://localhost:5050/mars-photos?sol=1234');
});

test('navigates to homepage when Back to Homepage is clicked', async () => {
  render(<MarsCameraUsage />);
  await waitFor(() => screen.getByTestId('mock-pie'));
  fireEvent.click(screen.getByText(/back to homepage/i));
  expect(mockNavigate).toHaveBeenCalledWith('/');
});