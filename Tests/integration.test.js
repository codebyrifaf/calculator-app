const basic = require("../Scripts/basic");
const advanced = require("../Scripts/advanced");
const custom = require("../Scripts/custom");

describe("Integration Tests - Custom Calculator with Basic and Advanced modules", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("calculateBill invokes functions from BOTH modules", () => {
    const subtractSpy = jest.spyOn(basic, "subtract");
    const multiplySpy = jest.spyOn(basic, "multiply");
    const addSpy = jest.spyOn(basic, "add");
    const percentageSpy = jest.spyOn(advanced, "percentage");
    const roundToSpy = jest.spyOn(advanced, "roundTo");

    custom.calculateBill(100, 350);

    expect(subtractSpy).toHaveBeenCalled();
    expect(multiplySpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalled();
    expect(percentageSpy).toHaveBeenCalled();
    expect(roundToSpy).toHaveBeenCalled();
  });

  test("calculateUnits delegates the subtraction to basic.subtract", () => {
    const subtractSpy = jest.spyOn(basic, "subtract");

    const units = custom.calculateUnits(100, 350);

    expect(subtractSpy).toHaveBeenCalledWith(350, 100);
    expect(subtractSpy).toHaveBeenCalledTimes(1);
    expect(units).toBe(250);
  });

  test("tax is delegated to advanced.percentage with the correct rate", () => {
    const percentageSpy = jest.spyOn(advanced, "percentage");

    custom.calculateBill(0, 250);

    expect(percentageSpy).toHaveBeenCalledWith(1850, 5);
  });

  test("averageCostPerUnit uses basic.divide rather than the / operator", () => {
    const divideSpy = jest.spyOn(basic, "divide");

    custom.averageCostPerUnit(100, 350);

    expect(divideSpy).toHaveBeenCalledTimes(1);
    expect(divideSpy).toHaveBeenCalledWith(1942.5, 250);
  });

  test("calculateLateFee uses advanced.pow for compounding", () => {
    const powSpy = jest.spyOn(advanced, "pow");
    const multiplySpy = jest.spyOn(basic, "multiply");

    custom.calculateLateFee(1000, 3);

    expect(powSpy).toHaveBeenCalledWith(1.02, 3);
    expect(multiplySpy).toHaveBeenCalled();
  });

  test("slab logic calls basic.multiply once per slab", () => {
    const multiplySpy = jest.spyOn(basic, "multiply");

    custom.calculateEnergyCharge(400);

    expect(multiplySpy).toHaveBeenCalledTimes(3);
  });

  test("an error in basic.divide propagates out of the custom module", () => {
    jest.spyOn(basic, "divide").mockImplementation(() => {
      throw new Error("Division by zero is not allowed");
    });

    expect(() => custom.averageCostPerUnit(100, 350))
      .toThrow("Division by zero is not allowed");
  });

});