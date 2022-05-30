"use strict";
const binInput = document.getElementById("binary-input");
const errorElem = document.getElementById("error");
const decElem = document.getElementById("dec");
const bin2dec = (number) => {
    return parseInt(number, 2);
};
let timeoutMan;
const displayError = (error) => {
    errorElem.textContent = error;
    if (timeoutMan) {
        clearTimeout(timeoutMan);
    }
    timeoutMan = setTimeout(() => {
        errorElem.innerText = "";
    }, 1000 * 0.5);
};
const is0or1 = (key) => {
    return key === "0" || key === "1";
};
const validateError = (key) => {
    if (is0or1(key)) {
        return key;
    }
    else {
        displayError("input either 1 or 2");
        return "";
    }
};
const displayDecimal = (number) => {
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
    }
    else {
        if (binInput.value.length >= 8) {
            return displayError("cannot be above 8 digits");
        }
        inputText += validateError(event.key);
        binInput.value = inputText;
        displayDecimal(inputText);
    }
});
