const custom = require("../Scripts/custom");

describe("Electricity Bill Calculator - Unit Tests", () => {

  describe("calculateUnits", () => {

    test("returns the difference between readings", () => {
      expect(custom.calculateUnits(100, 350)).toBe(250);
    });

    test("returns 0 when readings are equal", () => {
      expect(custom.calculateUnits(500, 500)).toBe(0);
    });

    test("throws when current reading is lower than previous", () => {
      expect(() => custom.calculateUnits(400, 200))
        .toThrow("Current reading cannot be less than previous reading");
    });

    test("throws for negative readings", () => {
      expect(() => custom.calculateUnits(-10, 100)).toThrow("cannot be negative");
    });

    test("throws for non-numeric input", () => {
      expect(() => custom.calculateUnits("abc", 100)).toThrow("must be a number");
    });

  });

  describe("calculateEnergyCharge - slab boundaries", () => {

    test("first slab only", () => {
      expect(custom.calculateEnergyCharge(50)).toBe(250);
    });

    test("exactly 100 units stays in the first slab", () => {
      expect(custom.calculateEnergyCharge(100)).toBe(500);
    });

    test("101 units crosses into the second slab", () => {
      expect(custom.calculateEnergyCharge(101)).toBe(508);
    });

    test("exactly 300 units stays in the second slab", () => {
      expect(custom.calculateEnergyCharge(300)).toBe(2100);
    });

    test("301 units crosses into the third slab", () => {
      expect(custom.calculateEnergyCharge(301)).toBe(2112);
    });

    test("zero units costs nothing", () => {
      expect(custom.calculateEnergyCharge(0)).toBe(0);
    });

  });

  describe("calculateBill", () => {

    test("returns a full breakdown", () => {
      expect(custom.calculateBill(100, 350)).toEqual({
        units: 250,
        energyCharge: 1700,
        fixedCharge: 150,
        tax: 92.5,
        total: 1942.5
      });
    });

    test("charges the fixed charge and tax even for zero usage", () => {
      const bill = custom.calculateBill(200, 200);
      expect(bill.units).toBe(0);
      expect(bill.total).toBe(157.5);
    });

  });

  describe("averageCostPerUnit", () => {

    test("divides the total by the units", () => {
      expect(custom.averageCostPerUnit(100, 350)).toBeCloseTo(7.77, 2);
    });

    test("throws when no units were consumed", () => {
      expect(() => custom.averageCostPerUnit(200, 200))
        .toThrow("Cannot compute average cost for zero units");
    });

  });

  describe("calculateLateFee", () => {

    test("is zero when no months have passed", () => {
      expect(custom.calculateLateFee(1000, 0)).toBe(0);
    });

    test("compounds at 2% per month", () => {
      expect(custom.calculateLateFee(1000, 1)).toBeCloseTo(20, 2);
      expect(custom.calculateLateFee(1000, 3)).toBeCloseTo(61.21, 2);
    });

    test("throws for a negative amount", () => {
      expect(() => custom.calculateLateFee(-500, 2)).toThrow("cannot be negative");
    });

  });

});