/* Mock Modules */

/* Mock the function using jest.mock() and jest.fn().
Write four tests inside a describe block. Do not forget to use the beforeEach function to clear the mock function.
Mock the functions in the utils files, they are being used in the convertCase function.
Set up the mock functions before each test.

1. Test cases for the reverseString function
2. Test cases for the toLowerCase function
3. Test cases for the toUpperCase function
4. Test cases for the default case when it is unknown
5. Test cases for the empty string
*/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { convertCase, CaseType } from "./convertCase";
import * as utils from "./utils"; // Importa todo el módulo para poder mockear

jest.mock("./utils", () => ({
  reverseString: jest.fn(),
  toUpperCase: jest.fn(),
  toLowerCase: jest.fn(),
}));

describe("convertCase", () => {
  const mockReverse = utils.reverseString as jest.Mock;
  const mockUpper = utils.toUpperCase as jest.Mock;
  const mockLower = utils.toLowerCase as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should use reverseString when caseType is 'reverse'", () => {
    mockReverse.mockReturnValue("edoc");
    const result = convertCase("code", "reverse");
    expect(mockReverse).toHaveBeenCalledWith("code");
    expect(result).toBe("edoc");
  });

  test("should use toLowerCase when caseType is 'lower'", () => {
    mockLower.mockReturnValue("code");
    const result = convertCase("CODE", "lower");
    expect(mockLower).toHaveBeenCalledWith("CODE");
    expect(result).toBe("code");
  });

  test("should use toUpperCase when caseType is 'upper'", () => {
    mockUpper.mockReturnValue("CODE");
    const result = convertCase("code", "upper");
    expect(mockUpper).toHaveBeenCalledWith("code");
    expect(result).toBe("CODE");
  });

  test("should return original string when caseType is 'unknown'", () => {
    const result = convertCase("Code", "unknown");
    expect(result).toBe("Code");
    expect(mockUpper).not.toHaveBeenCalled();
    expect(mockLower).not.toHaveBeenCalled();
    expect(mockReverse).not.toHaveBeenCalled();
  });

  test("should handle empty string for all case types", () => {
    mockUpper.mockReturnValue("");
    mockLower.mockReturnValue("");
    mockReverse.mockReturnValue("");

    expect(convertCase("", "upper")).toBe("");
    expect(mockUpper).toHaveBeenCalledWith("");

    expect(convertCase("", "lower")).toBe("");
    expect(mockLower).toHaveBeenCalledWith("");

    expect(convertCase("", "reverse")).toBe("");
    expect(mockReverse).toHaveBeenCalledWith("");

    expect(convertCase("", "unknown")).toBe("");
  });
});
