"use strict";
// variables
const mainScreen = document.querySelector("#main-screen");
const accumulator = document.querySelector("#sec-screen");
const calcButtonsNumber = document.querySelectorAll("#calc-button-number");
const clearMainScreenButton = document.querySelector("#clear-main-screen");
const calcButtonsAll = document.querySelectorAll(".calc-button");
const MAX_INPUT_LENGTH = 10;
const total = 0;
const accumulatorArray = [];
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
const listenToAllOperationsButton = () => { };
const listenToAllNumberButtons = () => {
    calcButtonsNumber.forEach((calcButton) => {
        calcButton.addEventListener("click", (e) => {
            addToTotal(e.target.innerHTML);
        });
    });
    clearMainScreenButton === null || clearMainScreenButton === void 0 ? void 0 : clearMainScreenButton.addEventListener("click", () => {
        clearMainScreen();
    });
};
const addStyleToAllButtonsOnPress = () => {
    calcButtonsAll.forEach((calcButton) => {
        calcButton.addEventListener("mousedown", (e) => {
            e.target.classList.add("clicked");
        });
        calcButton.addEventListener("touchstart", (e) => {
            e.target.classList.add("clicked");
        });
        calcButton.addEventListener("mouseup", (e) => {
            e.target.classList.remove("clicked");
        });
    });
};
// main
const main = () => {
    // events listeners
    addStyleToAllButtonsOnPress();
    listenToAllNumberButtons();
};
main();
