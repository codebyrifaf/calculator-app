function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

const basicModule = { add, subtract, multiply, divide };

if (typeof module !== "undefined" && module.exports) {
  module.exports = basicModule;
} else {
  window.basic = basicModule;
}