"use strict";
// variables
const mainScreen = document.querySelector("#main-screen");
const accumulator = document.querySelector("#sec-screen");
const calcButtons = document.querySelectorAll("#calc-button-number");
const clearMainScreenButton = document.querySelector("#clear-main-screen");
const MAX_INPUT_LENGTH = 10;
const count = [];
const total = 0;
// FUNCTIONS
const addToTotal = (num) => {
    if (mainScreen.innerHTML.length >= MAX_INPUT_LENGTH)
        return;
    if (mainScreen.innerHTML.length === 1) {
        if (mainScreen.innerHTML[0] === "0") {
            return (mainScreen.innerHTML = mainScreen.innerHTML = num);
        }
    }
    mainScreen.innerHTML += num;
};
const clearMainScreen = () => {
    mainScreen.innerHTML = "0";
};
const calcAction = () => { };
// listener
calcButtons.forEach((calcButton) => {
    calcButton.addEventListener("click", (e) => {
        addToTotal(e.target.innerHTML);
    });
});
clearMainScreenButton === null || clearMainScreenButton === void 0 ? void 0 : clearMainScreenButton.addEventListener("click", () => {
    clearMainScreen();
});
