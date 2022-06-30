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
function copyToClickBoard(str) {
    return __awaiter(this, void 0, void 0, function* () {
        yield navigator.clipboard.writeText(str);
        alert("Copied");
    });
}
function convertCSVToJSON(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result, null, 2);
}
function main() {
    // variables
    const csvTextArea = document.getElementById("csv");
    const jsonTextArea = document.getElementById("json");
    const convertToJsonBtn = (document.getElementById("convert2json"));
    const copyJSON = document.getElementById("copyjson");
    // conversion
    convertToJsonBtn.addEventListener("click", (e) => {
        if (csvTextArea.value === "")
            return alert("CSV textarea should not be empty");
        jsonTextArea.value = convertCSVToJSON(csvTextArea.value);
    });
    // copying the json file
    copyJSON.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
        if (jsonTextArea.value === "")
            return alert("cannot copy empty JSON");
        yield copyToClickBoard(jsonTextArea.value);
    }));
}
main();
