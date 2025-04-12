// # Practice: User Account Component
// This test suite focuses on verifying the UserAccount component's behavior using React Testing Library.
// We use userEvent (even though there's no "real" user action tested here) to stay consistent with best practices
// and ensure our tests remain implementation-detail-free.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAccount } from "./UserAccount";
import '@testing-library/jest-dom'


describe("UserAccount Component", () => {
  test("renders the component correctly with a user prop", () => {
    const mockUser = {
      id: 1,
      name: "Jane Doe",
      isManager: false,
    };

    render(<UserAccount user={mockUser} />);

    // Check the heading
    expect(screen.getByText("User Profile")).toBeInTheDocument();
    // Check the user's name is rendered
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  test("displays the Edit button when user is a manager", async () => {
    const mockManager = {
      id: 2,
      name: "John Manager",
      isManager: true,
    };

    render(<UserAccount user={mockManager} />);

    // The Edit button should be visible
    const editButton = screen.getByRole("button", { name: /Edit/i });
    expect(editButton).toBeInTheDocument();

    // Example user interaction (though no state changes here)
    await userEvent.click(editButton);
    // We don't have a handler in the component, but this ensures userEvent works as expected
  });

  test("does NOT display the Edit button when user is not a manager", () => {
    const mockNonManager = {
      id: 3,
      name: "Emily Employee",
      isManager: false,
    };

    render(<UserAccount user={mockNonManager} />);

    // The Edit button should not exist in the DOM at all
    expect(screen.queryByRole("button", { name: /Edit/i })).toBeNull();
  });
});
