const display = document.querySelector("#display");
const btns = document.querySelectorAll("button");

display.textContent = 0;

//after 1rst op, save result back to val1
let val1 = "";
let val2 = "";
let operator = "";
let buildVal1 = true;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  let result;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }
  return result;
}

function placeNumber(input) {
  if (buildVal1) {
    val1 = val1.concat(input);
    renderToUser(val1);
  } else {
    val2 = val2.concat(input);
    renderToUser(val1, val2, operator);
  }
}

function placeDecimal() {
  if (buildVal1 && !val1.includes(".")) {
    val1 = val1.concat(".");
    renderToUser(val1);
  } else if (!buildVal1 && !val2.includes(".")) {
    val2 = val2.concat(".");
    renderToUser(val1, val2, operator);
  }
}

function switchBuildVal1(bool) {
  buildVal1 = bool;
}

function checkIfOpReady() {
  const val1Ready = /[0-9]/.test(val1); //check for at least 1 num.
  const val2Ready = /[0-9]/.test(val2);
  return val1Ready && val2Ready && operator;
}

function placeOperator(input) {
  if (val1 && !operator) {
    operator = input;
    switchBuildVal1(false);
    renderToUser(val1, operator);
  } else {
    //if 2nd operator input, attempts to run operation.
    if (checkIfOpReady()) {
      const result = operate(parseFloat(val1), parseFloat(val2), operator);
      setForChainOp(result, input);
      renderToUser(result, input);
    }
  }
}

function setForChainOp(result, newOperator) {
  val1 = result;
  val2 = "";
  operator = newOperator;
}

function setForNewOp() {
  buildVal1 = true;
  val1 = "";
  val2 = "";
  operator = "";
}

function renderToUser(n1, n2 = "", oper = "") {
  n1 = n1 ? n1 : 0; //n1 may be passed an '', this fills div with 0 if ''.
  display.textContent = `${n1} ${oper} ${n2}`;
}

function deleteChar() {
  if (buildVal1 && !operator && val1) {
    val1 = val1.slice(0, val1.length - 1);
  } else if (!buildVal1 && operator && val2) {
    val2 = val2.slice(0, val2.length - 1);
  }
  renderToUser(val1, val2, operator);
}

function resetApp() {
  val1 = "";
  val2 = "";
  operator = "";
  buildVal1 = true;
  renderToUser();
}

function sortInput(event) {
  const input = event.target.id;

  if (/[0-9]/.test(input)) {
    placeNumber(input);
  } else if (input === ".") {
    placeDecimal();
  } else if (input === "=" && checkIfOpReady()) {
    const result = operate(parseFloat(val1), parseFloat(val2), operator);
    renderToUser(result);
    setForNewOp();
  } else if ("+-*/".includes(input)) {
    placeOperator(input);
  } else if (input === "delete") {
    deleteChar();
  } else if (input === "clear") {
    resetApp();
  }
}

btns.forEach((btn) => {
  btn.addEventListener("click", sortInput);
});

/**
 * Amost done, still need to handle div by 0, and making sure decimal vals are of
 * appropriate length.
 *
 */