import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // Mock fetch to prevent actual network calls
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
});

test('renders dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Octofit Tracker Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});
