"use strict";
var _a;
//elements
const messageBox = document.querySelector(".extra-message");
const loginButton = document.querySelector("#login");
const logoutButton = document.querySelector("#logout");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
let isUserLoggedIn = false;
// prevent form default behaviour
(_a = document
    .querySelector("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => e.preventDefault());
function login() {
    const usernameInputValue = usernameInput.value.trim();
    const passwordInputValue = passwordInput.value.trim();
    if (usernameInputValue == "" && passwordInputValue == "") {
        usernameInput.classList.add("error");
        passwordInput.classList.add("error");
        return;
    }
    if (usernameInputValue == "") {
        usernameInput.classList.add("error");
        passwordInput.classList.remove("error");
        return;
    }
    if (passwordInputValue == "") {
        passwordInput.classList.add("error");
        usernameInput.classList.remove("error");
        return;
    }
    fetch(" https://stefanbohacek.com/hellosalut/?mode=auto")
        .then((response) => response.json())
        .then((data) => {
        usernameInput.classList.remove("error");
        passwordInput.classList.remove("error");
        messageBox.innerHTML = `${data.hello} ${usernameInputValue} you have successfully logged in!`;
        isUserLoggedIn = true;
    });
}
function logout() {
    if (isUserLoggedIn) {
        messageBox.innerHTML = `Have a great day ${usernameInput.value}!`;
        usernameInput.classList.remove("error");
        passwordInput.classList.remove("error");
        usernameInput.value = "";
        passwordInput.value = "";
        isUserLoggedIn = false;
    }
}
loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);
