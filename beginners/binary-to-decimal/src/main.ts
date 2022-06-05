const binInput = <HTMLInputElement>document.getElementById("binary-input");
const errorElem = <HTMLDivElement>document.getElementById("error");
const decElem = <HTMLDivElement>document.getElementById("dec");

const bin2dec = (number: string) => {
  return parseInt(number, 2);
};

let timeoutMan: NodeJS.Timeout;

const displayError = (error: string) => {
  errorElem.textContent = error;
  if (timeoutMan) {
    clearTimeout(timeoutMan);
  }
  timeoutMan = setTimeout(() => {
    errorElem.innerText = "";
  }, 1000 * 0.5);
};

const is0or1 = (key: string) => {
  return key === "0" || key === "1";
};

const validateError = (key: string) => {
  if (is0or1(key)) {
    return key;
  } else {
    displayError("input either 0 or 1");
    return "";
  }
};

const displayDecimal = (number: string) => {
  decElem.innerText = `Decimal: ${bin2dec(number)}`;
};

// the state of input coming in our project
let inputText = "";

binInput.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.key === "Backspace") {
    inputText = inputText
      .split("")
      .slice(0, inputText.length - 1)
      .join("");

    binInput.value = inputText;
    displayDecimal(inputText);
  } else {
    if (binInput.value.length >= 8) {
      return displayError("cannot be above 8 digits");
    }
    inputText += validateError(event.key);
    binInput.value = inputText;
    displayDecimal(inputText);
  }
});
