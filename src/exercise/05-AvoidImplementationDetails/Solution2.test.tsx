// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "../sharedComponent/Counter.tsx";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

/**
 * By using userEvent instead of fireEvent, we're triggering all the same events a real user would.
 * this creates a test that is focused on the behaviour because it simulates the user's actions
 * rather than creating a single event allowing us to not worry about implementation under the hood.
 */

describe('Solution', () => {
  test('Solution', async () => {
    render(<Counter />)

    const decrement = screen.getByRole('button', { name: "Decrement" });
    const increment = screen.getByRole('button', { name: "Increment" });

    const message = screen.getByText(/Counter:/i);

    expect(message).toHaveTextContent("Counter: 0");
    await userEvent.click(increment);
    expect(message).toHaveTextContent("Counter: 1");
    await userEvent.click(decrement);
    expect(message).toHaveTextContent("Counter: 0");
  })
})
