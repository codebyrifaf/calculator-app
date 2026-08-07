const basic = require("../Scripts/basic");

describe("Basic Calculator - Unit Tests", () => {

  test("add returns the sum of two numbers", () => {
    expect(basic.add(2, 3)).toBe(6);
    expect(basic.add(-4, 4)).toBe(0);
  });

  test("subtract returns the difference", () => {
    expect(basic.subtract(10, 4)).toBe(6);
    expect(basic.subtract(4, 10)).toBe(-6);
  });

  test("multiply returns the product", () => {
    expect(basic.multiply(6, 7)).toBe(42);
    expect(basic.multiply(5, 0)).toBe(0);
  });

  test("divide returns the quotient", () => {
    expect(basic.divide(20, 4)).toBe(5);
    expect(basic.divide(7, 2)).toBe(3.5);
  });

  test("divide throws when dividing by zero", () => {
    expect(() => basic.divide(10, 0)).toThrow("Division by zero is not allowed");
  });

});