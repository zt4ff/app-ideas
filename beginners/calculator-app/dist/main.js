"use strict";
// variables
const mainScreen = document.querySelector("#main-screen");
const accumulator = document.querySelector("#sec-screen");
const calcButtonsNumber = document.querySelectorAll("#calc-button-number");
const clearMainScreenButton = document.querySelector("#clear-main-screen");
const calcButtonsAll = document.querySelectorAll(".calc-button");
const calcButtonsOperation = document.querySelectorAll(".operation");
const MAX_INPUT_LENGTH = 10;
const total = 0;
const accumulatorArray = Array(2).fill(undefined);
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
const performOperation = (numA, numB, operation) => {
    switch (operation) {
        case "+":
            return numA + numB;
        case "-":
            return numA - numB;
        case "/":
            return numA / numB;
        case "X":
            return numA * numB;
        default:
            // exhausive checks
            const _exh = operation;
    }
};
const listenToAllOperationsButton = () => {
    let ppp;
    calcButtonsOperation.forEach((calButton) => {
        calButton.addEventListener("click", (e) => {
            let operation = e.target.innerHTML;
            console.log(operation);
            if (!accumulatorArray[0]) {
                accumulatorArray[0] = parseFloat(mainScreen.innerHTML);
                mainScreen.innerHTML = "0";
                console.log("first");
                accumulator.innerHTML = `${accumulatorArray[0]}`;
            }
            else if (!accumulatorArray[1]) {
                accumulatorArray[1] = parseFloat(mainScreen.innerHTML);
                ppp = parseFloat(mainScreen.innerHTML);
                mainScreen.innerHTML = "0";
                console.log("second");
                accumulator.innerHTML = `${performOperation(accumulatorArray[0], accumulatorArray[1], operation)}`;
            }
            else {
                console.log("third");
                const a = parseFloat(accumulator.innerHTML);
                const b = parseFloat(mainScreen.innerHTML);
                accumulatorArray[0] = performOperation(a, b, operation);
                accumulatorArray[1] = undefined;
                mainScreen.innerHTML = "0";
                accumulator.innerHTML = `${accumulatorArray[0]}`;
            }
            console.log(accumulatorArray);
        });
    });
};
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
    listenToAllOperationsButton();
};
main();
