const custom = require("../Scripts/custom");

/**
 * DRIVER
 * Stands in for custom.html. It feeds the Custom Calculator module a set of
 * inputs and collects the outputs, so the module can be verified before (or
 * without) the web interface existing.
 */
function billingDriver(testCases) {
  return testCases.map((testCase) => {
    try {
      const bill = custom.calculateBill(testCase.previous, testCase.current);
      return { input: testCase, status: "OK", total: bill.total, units: bill.units };
    } catch (err) {
      return { input: testCase, status: "ERROR", message: err.message };
    }
  });
}

describe("Driver Demonstration - exercising the Custom Calculator standalone", () => {

  test("the driver processes a batch of valid readings", () => {
    const results = billingDriver([
      { previous: 0,   current: 50  },
      { previous: 100, current: 350 },
      { previous: 500, current: 900 }
    ]);

    expect(results).toHaveLength(3);
    expect(results.every((r) => r.status === "OK")).toBe(true);

    expect(results[0].units).toBe(50);
    expect(results[0].total).toBe(420);

    expect(results[1].units).toBe(250);
    expect(results[1].total).toBe(1942.5);
  });

  test("the driver reports invalid readings without crashing", () => {
    const results = billingDriver([
      { previous: 400, current: 200 },
      { previous: -10, current: 100 },
      { previous: 100, current: 350 }
    ]);

    expect(results[0].status).toBe("ERROR");
    expect(results[0].message).toContain("cannot be less than");

    expect(results[1].status).toBe("ERROR");
    expect(results[1].message).toContain("cannot be negative");

    // The valid case still succeeds after the failures.
    expect(results[2].status).toBe("OK");
  });

  test("the driver confirms bills rise as consumption rises", () => {
    const results = billingDriver([
      { previous: 0, current: 100 },
      { previous: 0, current: 300 },
      { previous: 0, current: 600 }
    ]);

    expect(results[0].total).toBeLessThan(results[1].total);
    expect(results[1].total).toBeLessThan(results[2].total);
  });

});