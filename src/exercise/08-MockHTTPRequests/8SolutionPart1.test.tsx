// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginSubmission from "../sharedComponent/LoginSubmission";
import '@testing-library/jest-dom';

// mock server instance that intercepts network requests.
const server = setupServer(
  // Define a mock handler for POST requests to the login API endpoint.
  rest.post("https://auth-provider.example.com/api/login", (req, res, ctx) => {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username || !password) {
      return res(ctx.status(400), ctx.json({ message: "Missing credentials" }));
    }

    if (username === "admin" && password === "admin123") {
      return res(ctx.json({ username }));
    }

    return res(ctx.status(401), ctx.json({ message: "Invalid credentials" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// --------------------
// Test Suite for Mock HTTP Requests
// --------------------
describe("Mock HTTP req", () => {

  // Test case: successful login when valid credentials are provided.
  test("successfully logs in a user", async () => {
    // Render the LoginSubmission component which includes the login form and submission logic.
    render(<LoginSubmission />);

    // Simulate user typing "admin" into the username field.
    await userEvent.type(screen.getByLabelText(/username/i), "admin");

    // Simulate user typing "admin123" into the password field.
    await userEvent.type(screen.getByLabelText(/password/i), "admin123");

    // Simulate clicking the submit button.
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the loading indicator (found by its aria-label) to be removed from the DOM.
    // This ensures that the asynchronous request has been processed.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Assert that the welcome message is displayed containing "Welcome admin".
    expect(screen.getByText(/welcome/i)).toHaveTextContent("Welcome admin");
  });

  // Test case: display error message when credentials are invalid.
  test("shows error message on invalid credentials", async () => {
    render(<LoginSubmission />);

    // Enter the username "admin".
    await userEvent.type(screen.getByLabelText(/username/i), "admin");

    // Enter an incorrect password "wrongpassword".
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");

    // Click the submit button.
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the loading spinner to be removed.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Assert that an element with a role of "alert" displays the error "Invalid credentials".
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials");
  });

  // Test case: display error when the username is missing.
  test("shows error message when username is missing", async () => {
    render(<LoginSubmission />);

    // Only type into the password field.
    await userEvent.type(screen.getByLabelText(/password/i), "admin123");

    // Click the submit button.
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait until the loading spinner is removed.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Assert that an element with role "alert" contains "Missing credentials".
    expect(screen.getByRole("alert")).toHaveTextContent("Missing credentials");
  });

  // Test case: display error when the password is missing.
  test("shows error message when password is missing", async () => {
    render(<LoginSubmission />);

    // Only type into the username field.
    await userEvent.type(screen.getByLabelText(/username/i), "admin");

    // Click the submit button.
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the loading indicator to be removed.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Assert that the error message "Missing credentials" is displayed.
    expect(screen.getByRole("alert")).toHaveTextContent("Missing credentials");
  });
});
