/* Introduction React Testing Library */

/*
## Background

React Testing Library is a lightweight solution for testing React components.
It provides a simple API for rendering components, firing events, and asserting
on the output. It encourages you to test your components in a way that
resembles how the end user will interact with them. This means that you should
be testing the output of your components, not the implementation details. This
is a good thing! It means that you can change the implementation of your
components without having to change your tests. It also means that you can
test your components in a way that resembles how the end user will interact
with them.

[React Testing Library](https://testing-library.com/react) is the React
implementation of the [DOM Testing Library](https://testing-library.com)
(there's also a
[React Native Testing Library](https://testing-library.com/react-native) and
many others). 
Here's a simple example of how to use this:
*/

// javascript
import { render, fireEvent, screen } from "@testing-library/react";

test("it works", () => {
  const { container } = render(<Example />);
  // container is the div that your component has been mounted onto.

  const input = container.querySelector("input");
  fireEvent.mouseEnter(input); // fires a mouseEnter event on the input

  screen.debug(); // logs the current state of the DOM (with syntax highlighting!)
});

/*
React Testing Library has the following automatic features:
- It automatically cleans up the DOM after each test. This means that you
  don't have to worry about cleaning up the DOM after each test. This is a
  good thing!
- It automatically wraps your tests in `act`. This means that you don't
    have to worry about wrapping your tests in `act`. This is a good thing!
- It automatically provides you with a `screen` object that contains
  methods for querying the DOM. This means that you don't have to worry
  about querying the DOM. This is a good thing!
- It automatically provides you with a `fireEvent` object that contains
  methods for firing events. This means that you don't have to worry about
  firing events. This is a good thing!

## Exercise

In this exercise, we're going to refactor the test of exercise 03 using React
Testing Library does for us. The emoji should guide you pretty well on this one
so I'll let you have at it!


// Remove this. React Testing Library does this automatically!
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // Remove these two lines, React Testing Library will create the div for you
  const div = document.createElement('div')
  document.body.append(div)

  // swap createRoot and root.render with React Testing Library's render
  // Note that React Testing Library's render doesn't need you to pass a `div`
  // so you only need to pass one argument. render returns an object with a
  // bunch of utilities on it. For now, let's just grab `container` which is
  // the div that React Testing Library creates for us.
  // const {container} = render(<Counter />)
  const root = createRoot(div)
  act(() => root.render(<Counter />))

  // instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  // replace the next two statements with `fireEvent.click(button)`
  // note that you can remove `act` completely!
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  act(() => increment.dispatchEvent(incrementClickEvent))
  expect(message.textContent).toBe('Current count: 1')
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  act(() => decrement.dispatchEvent(decrementClickEvent))
  expect(message.textContent).toBe('Current count: 0')
})


*/
