  /* Exercise 0: Test the function by using a spyOn function */

  /* Mock the function using spyOn
  Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
  The mock function receives a prop of type number. The mocked function adds a 6 to the number.
  1. First Test: 
  The forEach function should be called 3 times
  2. Second Test:
  The forEach function should be called with the correct arguments.
  3. Third Test:
  Test the first argument of the first call to the function was 0 and the result is 6.
  Test the first argument of the second call to the function was 1  and the result is 7.
  4. Forth Test:
  Test the first argument of the third call to the function was 4 and the result is not 9.
  */

import { forEach } from './forEach';

describe('forEach function tests', () => {
  let mockCallback: jest.Mock;

  beforeEach(() => {
    // Reset the mock before each test
    mockCallback = jest.fn((n: number) => n + 6);
  });

  test('The forEach function should be called 3 times', () => {
    const numbers = [0, 1, 4];
    forEach(numbers, mockCallback);
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  test('The forEach function should be called with the correct arguments', () => {
    const numbers = [0, 1, 4];
    forEach(numbers, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(0);
    expect(mockCallback).toHaveBeenCalledWith(1);
    expect(mockCallback).toHaveBeenCalledWith(4);
  });

  test('Test the first argument of the first call to the function was 0 and the result is 6', () => {
    const numbers = [0, 1, 4];
    forEach(numbers, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(0);
    expect(mockCallback.mock.results[0].value).toBe(6);
  });

  test('Test the first argument of the second call to the function was 1 and the result is 7', () => {
    const numbers = [0, 1, 4];
    forEach(numbers, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(1);
    expect(mockCallback.mock.results[1].value).toBe(7);
  });

  test('Test the first argument of the third call to the function was 4 and the result is not 9', () => {
    const numbers = [0, 1, 4];
    forEach(numbers, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(4);
    expect(mockCallback.mock.results[2].value).not.toBe(9);
  });
});
