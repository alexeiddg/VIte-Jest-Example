import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../sharedComponent/Login';

describe('Login form', () => {
  test('should allow a user to submit their username and password', async () => {
    const mockOnSubmit = jest.fn();
    render(<Login onSubmit={mockOnSubmit} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(usernameInput, 'jest');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: 'jest',
      password: 'password',
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
