import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import PasswordContainer from '.';

describe('PasswordContainer', () => {
  it('renders the component', () => {
    const { getByPlaceholderText, getByText } = render(
      <PasswordContainer onSubmit={() => {}} />
    );

    const passwordInput = getByPlaceholderText('Enter password');
    const confirmPasswordInput = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Submit');

    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('validates and submits the form on correct password', async () => {
    const onSubmitMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <PasswordContainer onSubmit={onSubmitMock} />
    );

    const passwordInput = getByPlaceholderText('Enter password');
    const confirmPasswordInput = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Submit');

    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'ValidPassword1!' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
      expect(getByText('Validation passed')).toBeInTheDocument();
    });
  });

  it('displays validation errors on incorrect password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <PasswordContainer onSubmit={() => {}} />
    );

    const passwordInput = getByPlaceholderText('Enter password');
    const confirmPasswordInput = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Submit');

    fireEvent.change(passwordInput, { target: { value: 'invalid' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'mismatch' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Passwords do not match')).toBeInTheDocument();
      expect(
        getByText('Must contain at least 1 uppercase letter')
      ).toBeInTheDocument();
      expect(getByText('Must contain at least 1 number')).toBeInTheDocument();
      expect(
        getByText('Must contain at least 1 special character')
      ).toBeInTheDocument();
    });
  });

  it('displays validation errors on empty password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <PasswordContainer onSubmit={() => {}} />
    );

    const passwordInput = getByPlaceholderText('Enter password');
    const confirmPasswordInput = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Submit');

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText('Must be at least 6 characters long')
      ).toBeInTheDocument();
    });
  });

  it('displays validation errors on short password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <PasswordContainer onSubmit={() => {}} />
    );

    const passwordInput = getByPlaceholderText('Enter password');
    const confirmPasswordInput = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Submit');

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText('Must be at least 6 characters long')
      ).toBeInTheDocument();
    });
  });
});
