import React from 'react';
import { render, screen } from '@testing-library/react';
import TypewriterAnimation from '../components/typeWriterAnimation';
import '@testing-library/jest-dom';

// Mock react-simple-typewriter so we control its output
jest.mock('react-simple-typewriter', () => ({
  useTypewriter: () => ['Mocked text'],
  Cursor: () => <span>_</span>,
}));

describe('TypewriterAnimation', () => {
  it('renders the typewriter text and cursor', () => {
    render(<TypewriterAnimation words="Hello, World!" />);
    expect(screen.getByText(/Mocked text/i)).toBeInTheDocument();
    expect(screen.getByText('_')).toBeInTheDocument();
  });
});
