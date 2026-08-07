const isNode = typeof module !== "undefined" && module.exports;

const basic = isNode ? require("./basic") : window.basic;
const advanced = isNode ? require("./advanced") : window.advanced;

const FIXED_CHARGE = 150;
const TAX_RATE = 5;
const LATE_FEE_RATE = 0.02;

function validateReading(value, name) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(name + " must be a number");
  }
  if (value < 0) {
    throw new Error(name + " cannot be negative");
  }
}

function calculateUnits(previousReading, currentReading) {
  validateReading(previousReading, "Previous reading");
  validateReading(currentReading, "Current reading");
  if (currentReading < previousReading) {
    throw new Error("Current reading cannot be less than previous reading");
  }
  return basic.subtract(currentReading, previousReading);
}

function calculateEnergyCharge(units) {
  validateReading(units, "Units");

  if (units <= 100) {
    return basic.multiply(units, 5);
  }

  if (units <= 300) {
    const firstSlab = basic.multiply(100, 5);
    const secondSlab = basic.multiply(basic.subtract(units, 100), 8);
    return basic.add(firstSlab, secondSlab);
  }

  const firstSlab = basic.multiply(100, 5);
  const secondSlab = basic.multiply(200, 8);
  const thirdSlab = basic.multiply(basic.subtract(units, 300), 12);
  return basic.add(basic.add(firstSlab, secondSlab), thirdSlab);
}

function calculateBill(previousReading, currentReading) {
  const units = calculateUnits(previousReading, currentReading);
  const energyCharge = calculateEnergyCharge(units);
  const subtotal = basic.add(energyCharge, FIXED_CHARGE);
  const tax = advanced.percentage(subtotal, TAX_RATE);
  const total = basic.add(subtotal, tax);

  return {
    units: units,
    energyCharge: advanced.roundTo(energyCharge, 2),
    fixedCharge: FIXED_CHARGE,
    tax: advanced.roundTo(tax, 2),
    total: advanced.roundTo(total, 2)
  };
}

function averageCostPerUnit(previousReading, currentReading) {
  const bill = calculateBill(previousReading, currentReading);
  if (bill.units === 0) {
    throw new Error("Cannot compute average cost for zero units");
  }
  return advanced.roundTo(basic.divide(bill.total, bill.units), 2);
}

function calculateLateFee(amount, months) {
  validateReading(amount, "Amount");
  validateReading(months, "Months");
  const growthFactor = advanced.pow(basic.add(1, LATE_FEE_RATE), months);
  const inflated = basic.multiply(amount, growthFactor);
  return advanced.roundTo(basic.subtract(inflated, amount), 2);
}

const customModule = {
  calculateUnits,
  calculateEnergyCharge,
  calculateBill,
  averageCostPerUnit,
  calculateLateFee
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = customModule;
} else {
  window.custom = customModule;
}