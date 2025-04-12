// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, perBuild } from '@jackfranklin/test-data-bot';
import Login from '../sharedComponent/Login';
import fake from 'faker';

// builder for the login form data
const buildLoginForm = build({
  fields: {
    username: perBuild(() => fake.internet.userName()),
    password: perBuild(() => fake.internet.password()),
  },
});

/**
 * Test creates dynamic mock data, when called it creates a random username and password
 * Jest mock fn handles and checks the form to have been called
 * user event simulates user typing out their credentials and form submit
 * ----------------------------------------------------------
 * This test "trims the fat" by focusing only on what matters:
 * verifying that the form correctly submits the entered values.
 *
 * Instead of the traditional 1-2 step approach:
 *  1. Find the input elements
 * 2. Type in hardcoded values
 *
 * we use a data builder (buildLoginForm) to dynamically generate
 * realistic values. This keeps the test clean and focused on behavior
 *
 *
 * thus the test is easier to maintain (no hardcoded data everywhere),
 * easier to read and more resilient (less likely to break from implementation changes)
 */

describe('Login form with dynamic test data', () => {
  test('should submit the form with generated username and password', async () => {
    const mockOnSubmit = jest.fn();
    const { username, password } = buildLoginForm();

    render(<Login onSubmit={mockOnSubmit} />);

    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({ username, password });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
