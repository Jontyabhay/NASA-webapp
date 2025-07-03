// NeoBarGraph.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NeoBarGraph from './NeoBarGraph';

// Mock Bar chart
jest.mock('react-chartjs-2', () => ({
  Bar: ({ data }) => <div data-testid="mock-bar">{JSON.stringify(data)}</div>,
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock fetch (if using fetch)
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        // mock response structure as expected by your component
        near_earth_objects: {
          '2023-01-01': [{ name: 'Asteroid 1', id: 1 }],
          '2023-01-02': [{ name: 'Asteroid 2', id: 2 }],
        }
      }),
    })
  );
  mockNavigate.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders NeoBarGraph title', () => {
  render(<NeoBarGraph />);
  expect(screen.getByText(/Near Eath Objects Bar Graph/i)).toBeInTheDocument();
});

test('shows loading and renders Bar chart after fetch', async () => {
  render(<NeoBarGraph />);
  fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-01-01' } });
  fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-01-02' } });
  fireEvent.click(screen.getByText(/Fetch Data/i));

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument());
  expect(screen.getByTestId('mock-bar')).toBeInTheDocument();
});

test('shows error on fetch failure', async () => {
  global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
  render(<NeoBarGraph />);
  fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-01-01' } });
  fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-01-02' } });
  fireEvent.click(screen.getByText(/Fetch Data/i));

  await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
});

test('navigates back to homepage on button click', () => {
  render(<NeoBarGraph />);
  fireEvent.click(screen.getByText(/Back to Homepage/i));
  expect(mockNavigate).toHaveBeenCalledWith('/');
});