import React from 'react';
import { render, screen } from '@testing-library/react';
import TypewriterAnimation from '../components/typeWriterAnimation';
import '@testing-library/jest-dom';

// Mock the useTypewriter hook
jest.mock('react-simple-typewriter', () => ({
  useTypewriter: () => ['Mocked text'],
  Cursor: () => <p>|</p>,
}));

describe('TypewriterAnimation', () => {
  test('renders the typewriter text and cursor', () => {
    render(<TypewriterAnimation words="Hello, World!" />);
    expect(screen.getByText(/Mocked text/i)).toBeInTheDocument();
    
    expect(screen.getByText('|')).toBeInTheDocument();
  });
});
