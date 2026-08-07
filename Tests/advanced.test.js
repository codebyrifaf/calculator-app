const advanced = require("../Scripts/advanced");

describe("Advanced Calculator - Unit Tests", () => {

  test("pow raises a base to an exponent", () => {
    expect(advanced.pow(2, 10)).toBe(1024);
    expect(advanced.pow(9, 0)).toBe(1);
  });

  test("sqrt returns the square root", () => {
    expect(advanced.sqrt(81)).toBe(9);
    expect(advanced.sqrt(0)).toBe(0);
  });

  test("sqrt throws for negative input", () => {
    expect(() => advanced.sqrt(-4)).toThrow("Cannot take square root of a negative number");
  });

  test("percentage returns a percent of a value", () => {
    expect(advanced.percentage(200, 10)).toBe(20);
    expect(advanced.percentage(1850, 5)).toBe(92.5);
  });

  test("roundTo rounds to the given decimals", () => {
    expect(advanced.roundTo(7.7699, 2)).toBe(7.77);
    expect(advanced.roundTo(3.14159, 0)).toBe(3);
  });

});