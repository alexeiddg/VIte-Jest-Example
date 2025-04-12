// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAccount } from "./UserAccount";
import '@testing-library/jest-dom'

/**
 * These tests stay implementation free from testing since we fetch the components
 * using the getByText and getByRole by finding the correct elements we need to test
 * ----------------------------------------------------------------------------------
 * Test 1 checks if given a user the components renders the expected fields
 * test 2 checks if the user is a manager it displays the edit button and is clickable
 * test 2 checks if the user is not a manager the edit button should not be rendered by the component
 */

describe("UserAccount Component", () => {
  test("renders the component correctly with a user prop", () => {
    const mockUser = {
      id: 1,
      name: "Jane Doe",
      isManager: false,
    };

    render(<UserAccount user={mockUser} />);

    expect(screen.getByText("User Profile")).toBeInTheDocument();
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

    const editButton = screen.getByRole("button", { name: /Edit/i });
    expect(editButton).toBeInTheDocument();

    await userEvent.click(editButton);
  });

  test("does NOT display the Edit button when user is not a manager", () => {
    const mockNonManager = {
      id: 3,
      name: "Emily Employee",
      isManager: false,
    };

    render(<UserAccount user={mockNonManager} />);

    expect(screen.queryByRole("button", { name: /Edit/i })).toBeNull();
  });
});
