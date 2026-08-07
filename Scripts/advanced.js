function pow(base, exponent) {
  return Math.pow(base, exponent);
}

function sqrt(x) {
  if (x < 0) {
    throw new Error("Cannot take square root of a negative number");
  }
  return Math.sqrt(x);
}

function percentage(value, percent) {
  return (value * percent) / 100;
}

function roundTo(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

const advancedModule = { pow, sqrt, percentage, roundTo };

if (typeof module !== "undefined" && module.exports) {
  module.exports = advancedModule;
} else {
  window.advanced = advancedModule;
}