"use strict";
function convertToCent(num) {
    return (Number(num) * 100).toFixed();
}
function main() {
    const dollarInput = document.getElementById("dollar");
    const centInput = document.getElementById("cents");
    dollarInput.addEventListener("input", (e) => {
        centInput.value = convertToCent(e.target.value);
    });
}
main();
