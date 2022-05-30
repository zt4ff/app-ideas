"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const convertToCamelCase = (str) => {
    let strArr = str
        .split("-")
        .map((arr) => arr[0].toUpperCase() + arr.slice(1))
        .join("");
    return strArr[0].toLowerCase() + strArr.slice(1);
};
const previewer = document.getElementById("previewer");
const controllers = document.querySelectorAll("input");
const copyCSSButton = document.querySelector("#copy-btn");
controllers.forEach((controller) => {
    controller.addEventListener("change", (e) => {
        const camelCaseStyle = convertToCamelCase(e.target.name);
        previewer.style[camelCaseStyle] =
            `${e.target.value}` + "%";
        console.log(convertToCamelCase(e.target.name));
    });
});
// copy generate css to clipboard
copyCSSButton.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    let copy = "";
    controllers.forEach((controller) => {
        copy += `${controller.name}: ${controller.value}%;\n`;
    });
    yield navigator.clipboard.writeText(copy);
    alert("copied");
}));
