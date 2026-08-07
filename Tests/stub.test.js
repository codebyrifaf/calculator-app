const basic = require("../Scripts/basic");
const advanced = require("../Scripts/advanced");
const custom = require("../Scripts/custom");

describe("Stub Demonstration - replacing the Advanced module", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("calculateBill works with a STUBBED advanced.percentage", () => {
    // Stub: pretend tax is always a flat 100, whatever the input.
    jest.spyOn(advanced, "percentage").mockImplementation(() => 100);

    const bill = custom.calculateBill(100, 350);

    // Energy 1700 + fixed 150 = 1850, then the stubbed tax of 100.
    expect(bill.tax).toBe(100);
    expect(bill.total).toBe(1950);
  });

  test("a stubbed advanced.roundTo shows custom.js depends on it for formatting", () => {
    // Stub: return the value untouched instead of rounding.
    jest.spyOn(advanced, "roundTo").mockImplementation((value) => value);

    const avg = custom.averageCostPerUnit(100, 350);

    // Without rounding we get the full floating-point value.
    expect(avg).toBeCloseTo(7.77, 2);
    expect(advanced.roundTo).toHaveBeenCalled();
  });

  test("a stubbed basic module lets the Custom Calculator be tested in isolation", () => {
    // Stub the whole slab calculation path with predictable values.
    jest.spyOn(basic, "subtract").mockImplementation(() => 200);
    jest.spyOn(basic, "multiply").mockImplementation(() => 1000);
    jest.spyOn(basic, "add").mockImplementation(() => 2000);

    const units = custom.calculateUnits(0, 0);

    // The stub decides the answer, not the real subtraction.
    expect(units).toBe(200);
    expect(basic.subtract).toHaveBeenCalled();
  });

});