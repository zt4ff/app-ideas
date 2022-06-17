// variables
const total = document.getElementById("total") as HTMLDivElement;
const accumulator = document.getElementById("accumulator") as HTMLDivElement;

type ACTION = "+" | "-" | "x" | "/";

let count: number[] = [];
let saveAction: ACTION;

const MAX_VISOR_CHAR = 10;

function AddNumber(num: number) {
  total.removeAttribute("hidden");
  if (total.innerHTML.length < MAX_VISOR_CHAR) {
    total.innerHTML += num;
  }
}

function CalcAction(action: number) {
  var currentNumber = total.innerHTML;

  if (currentNumber.length === 0) {
    return;
  }

  count.push(Number(total.innerHTML));

  if (currentNumber.split("")[currentNumber.length - 1] == ".") {
    accumulator.removeAttribute("hidden");
    accumulator.innerHTML += ` ${total.innerHTML}0 ${action}`;
  } else {
    accumulator.removeAttribute("hidden");
    accumulator.innerHTML += ` ${total.innerHTML} ${action}`;
  }

  total.innerHTML = "";

  count.push(action);
}

function AddComma() {
  var currentNumber = total.innerHTML;

  if (currentNumber == "") {
    total.removeAttribute("hidden");
    total.innerHTML = "0.";
  } else if (!currentNumber.includes(".")) {
    total.innerHTML += ".";
  }
}

function Result() {
  let currentAccum = accumulator.innerHTML;
  let currentNumber = total.innerHTML;

  if (
    currentAccum[currentAccum.length - 1] === "=" &&
    currentNumber.length > 0
  ) {
    total.innerHTML = ProcessAction(
      Number(currentNumber),
      Number(currentNumber),
      saveAction
    )
      .toString()
      .substring(0, MAX_VISOR_CHAR);
  }

  if (count.length === 0) {
    return;
  }

  count.push(Number(total.innerHTML));
  accumulator.innerHTML += ` ${total.innerHTML} =`;
  ProccessResult();
}

function ProccessResult() {
  let action: ACTION | null = null;
  let current: number | null = null;

  let totalResult = 0;

  if (isNaN(count[count.length - 1])) {
    count.pop();
  }

  count.forEach((n) => {
    if (!isNaN(n)) {
      if (current == null) {
        current = n;
      } else {
        totalResult += ProcessAction(current, n, action!);
        current = null;
      }
    } else {
      action = n as unknown as ACTION;
      saveAction = n as unknown as ACTION;
    }
  });

  if (current != null) {
    totalResult = ProcessAction(totalResult, current, action!);
  }

  total.innerHTML = totalResult.toString().substring(0, MAX_VISOR_CHAR);
  count = [];
}

function ProcessAction(num1: number, num2: number, action: ACTION) {
  switch (action) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

function CleanCurrentEntry() {
  total.innerHTML = "";
}

function CleanAll() {
  total.innerHTML = "";
  total.innerHTML = "";
  count = [];
}

function Percentage() {
  var currentNumber = total.innerHTML;
  if (currentNumber != "") {
    total.innerHTML = `${Number(total.innerHTML) / 100}`;
  }
}
