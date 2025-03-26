/// <reference types="@testing-library/jest-dom" />

// LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/loginForm';
import { ApolloError } from '@apollo/client';
import '@testing-library/jest-dom';


describe('LoginForm', () => {
  test('renders login form fields, button, and register link', () => {
    render(
      <LoginForm
        formData={{ identifier: '', password: '' }}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        loading={false}
        error={undefined}
      />
    );
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username or email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    expect(screen.getByText(/Register Now/i)).toBeInTheDocument();
  });

  test('calls handleSubmit with form values on submit', async () => {
    // Provide preset values through formData; the Form will use these as its initial state.
    const formData = { identifier: 'testuser', password: 'secret' };
    const handleSubmitMock = jest.fn(() => Promise.resolve());
    render(
      <LoginForm
        formData={formData}
        handleChange={jest.fn()}
        handleSubmit={handleSubmitMock}
        loading={false}
        error={undefined}
      />
    );
    // Find and click the submit button to trigger onFinish.
    const submitButton = screen.getByRole('button', { name: /Log In/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledWith(formData);
    });
  });

  test('displays error message when error prop is provided', () => {
    const error = new ApolloError({ errorMessage: 'Invalid credentials' });
    render(
      <LoginForm
        formData={{ identifier: '', password: '' }}
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        loading={false}
        error={error}
      />
    );
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
