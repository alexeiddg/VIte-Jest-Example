

/**
 * rather than relying on specific tags or structural choices. By using role-based queries
 * getByRole and text-based checks getByText, we ensure that our tests
 * won't break if the component's internal implementation changes.
 * */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "../sharedComponent/Counter.tsx";
import "@testing-library/jest-dom";

describe('Solution', () => {
  test('Solution', () => {
    render(<Counter/>)

    const decrement = screen.getByRole('button', { name: "Decrement" });
    const increment = screen.getByRole('button', { name: "Increment" });

    const message = screen.getByText(/Counter:/i);

    expect(message).toHaveTextContent("Counter: 0");
    fireEvent.click(increment);
    expect(message).toHaveTextContent("Counter: 1");
    fireEvent.click(decrement);
    expect(message).toHaveTextContent("Counter: 0");
  })
})
