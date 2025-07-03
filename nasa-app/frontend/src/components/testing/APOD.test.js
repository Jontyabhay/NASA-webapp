// APOD.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import APOD from './APOD';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders APOD Gallery title', () => {
  render(<APOD />);
  expect(screen.getByText(/APOD Gallery/i)).toBeInTheDocument();
});

test('shows loading and fetches APODs successfully', async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ title: 'Test APOD', date: '2022-01-01' }]
  });

  render(<APOD />);
  fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2022-01-01' } });
  fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2022-01-02' } });

  // Simulate fetch button click (add a button in your component if not present)
  // fireEvent.click(screen.getByText(/Fetch/i));

  // If fetch is triggered on input change or form submit, adjust accordingly

  await waitFor(() => expect(axios.get).toHaveBeenCalled());
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Test APOD/i)).toBeInTheDocument();
});

test('shows error on fetch failure', async () => {
  axios.get.mockRejectedValueOnce(new Error('Network error'));

  render(<APOD />);
  fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2022-01-01' } });
  fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2022-01-02' } });

  // Simulate fetch button click if needed

  await waitFor(() => expect(axios.get).toHaveBeenCalled());
  expect(screen.getByText(/Failed to fetch APODs/i)).toBeInTheDocument();
});