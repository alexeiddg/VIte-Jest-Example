// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserList } from "./UserList.tsx";

// Test data
const users = [
  { id: 1, name: "John Doe", isManager: true },
  { id: 2, name: "Jane Smith", isManager: false },
  { id: 3, name: "Alice Johnson", isManager: true },
];

const emptyUsers = [];
const singleUser = [{ id: 1, name: "John Doe", isManager: true }];
const userWithNoId = [{ id: "", name: "John Doe", isManager: true }];
const userWithNoManager = [{ id: 1, name: "John Doe", isManager: false }];
const userWithNoNameAndId = [{ id: "", name: "", isManager: false }];


describe("UserList Component", () => {
  test("renders correctly with multiple users", () => {
    render(<UserList users={users} />);
    // Check the heading
    expect(screen.getByText("User List")).toBeInTheDocument();

    // Ensure each user name is rendered
    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });

  test("displays 'No users found' when there are no users", () => {
    render(<UserList users={emptyUsers} />);
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  test("renders user names as links in the list", () => {
    render(<UserList users={users} />);

    users.forEach((user) => {
      const userLink = screen.getByRole("link", { name: user.name });
      expect(userLink).toBeInTheDocument();
      // Check that the href is correct
      expect(userLink).toHaveAttribute("href", `#user-${user.id}`);
    });
  });

  test("renders correctly with a single user", () => {
    render(<UserList users={singleUser} />);
    expect(screen.getByText("User List")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("handles user with no ID", () => {
    // Renders even if the id is empty
    render(<UserList users={userWithNoId} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("handles user with no name and no ID", () => {
    // Check that you get an empty link
    render(<UserList users={userWithNoNameAndId} />);

    // There is an empty name, so the link might be empty or not visible by text
    // Instead, find the link by role and see if it's there
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "#user-");
  });

  test("user name links can be clicked", async () => {
    render(<UserList users={users} />);
    const user = userEvent.setup();
    const firstUserLink = screen.getByRole("link", { name: "John Doe" });
    await user.click(firstUserLink);
    expect(firstUserLink).toBeInTheDocument();
  });
});
