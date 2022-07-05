"use strict";
const idInput = document.getElementById("id");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");
const cancelButton = document.getElementById("cancel");
const testUser = {
    id: "123",
    password: "password",
};
loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener("click", (e) => {
    if (idInput.value.trim() === "") {
        idInput.style.background = "lightyellow";
    }
    else if (idInput.value !== testUser.id) {
        idInput.style.background = "#e6adad";
        console.log("here");
    }
    if (passwordInput.value.trim() === "") {
        passwordInput.style.background = "lightyellow";
    }
    else if (passwordInput.value !== testUser.password) {
        passwordInput.style.background = "#e6adad";
    }
});
cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.addEventListener("click", () => {
    passwordInput.style.background = "white";
    idInput.style.background = "white";
});
