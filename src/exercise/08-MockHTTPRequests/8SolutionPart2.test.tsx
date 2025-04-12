// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as React from "react";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginSubmission from "../sharedComponent/LoginSubmission";
import "@testing-library/jest-dom";
import { handlers } from "./handlers.ts";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Mock HTTP req - Externalized Handlers & Inline Snapshots", () => {
  test("successfully logs in a user", async () => {
    render(<LoginSubmission />);

    // Simulate entering valid credentials.
    await userEvent.type(screen.getByLabelText(/username/i), "admin");
    await userEvent.type(screen.getByLabelText(/password/i), "admin123");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait until the spinner (located by its aria-label) is removed.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Assert that the welcome message is rendered.
    expect(screen.getByText(/welcome/i)).toHaveTextContent("Welcome admin");
  });

  test("shows error message on invalid credentials", async () => {
    render(<LoginSubmission />);

    // Simulate entering an invalid password.
    await userEvent.type(screen.getByLabelText(/username/i), "admin");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the spinner to disappear.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Use an inline snapshot to assert the error message.
    expect(screen.getByRole("alert")).toMatchInlineSnapshot(`
      <div
        role="alert"
        style="color: red;"
      >
        Invalid credentials
      </div>
    `);
  });

  test("shows error message when username is missing", async () => {
    render(<LoginSubmission />);

    // Only type the password.
    await userEvent.type(screen.getByLabelText(/password/i), "admin123");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait until the spinner is gone.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Use inline snapshot to match the error message.
    expect(screen.getByRole("alert")).toMatchInlineSnapshot(`
      <div
        role="alert"
        style="color: red;"
      >
        Missing credentials
      </div>
    `);
  });

  test("shows error message when password is missing", async () => {
    render(<LoginSubmission />);

    // Only type the username.
    await userEvent.type(screen.getByLabelText(/username/i), "admin");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait until the spinner is gone.
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // Assert using inline snapshot.
    expect(screen.getByRole("alert")).toMatchInlineSnapshot(`
      <div
        role="alert"
        style="color: red;"
      >
        Missing credentials
      </div>
    `);
  });
});
