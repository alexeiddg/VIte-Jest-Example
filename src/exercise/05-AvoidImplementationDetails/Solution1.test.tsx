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
