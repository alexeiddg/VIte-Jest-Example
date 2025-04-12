/* Exercise 0: Test the function by using a mock function */

/* Mock the function using jest.fn().
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

  // beforeEach se asegura de que el mock esté limpio antes de cada test
  beforeEach(() => {
    mockCallback = jest.fn((num: number) => num + 6);  // mock que añade 6 al número
  });

  it('should call forEach function 3 times', () => {
    const items = [0, 1, 4];
    forEach(items, mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  it('should call forEach with the correct arguments', () => {
    const items = [0, 1, 4];
    forEach(items, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(0);
    expect(mockCallback).toHaveBeenCalledWith(1);
    expect(mockCallback).toHaveBeenCalledWith(4);
  });

  it('should test first argument and result of first and second calls', () => {
    const items = [0, 1, 4];
    forEach(items, mockCallback);

    // Primer llamada
    expect(mockCallback).toHaveBeenNthCalledWith(1, 0);
    expect(mockCallback.mock.results[0].value).toBe(6);  // El resultado de la primera llamada

    // Segunda llamada
    expect(mockCallback).toHaveBeenNthCalledWith(2, 1);
    expect(mockCallback.mock.results[1].value).toBe(7);  // El resultado de la segunda llamada
  });

  it('should test third argument and ensure result is not 9', () => {
    const items = [0, 1, 4];
    forEach(items, mockCallback);

    // Tercera llamada
    expect(mockCallback).toHaveBeenNthCalledWith(3, 4);
    expect(mockCallback.mock.results[2].value).not.toBe(9);  // Asegura que el resultado no es 9
  });
});

