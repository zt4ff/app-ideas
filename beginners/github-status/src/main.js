"use strict";
exports.__esModule = true;
var request_1 = require("request");
(0, request_1["default"])("https://www.githubstatus.com/", { json: true }, function (err, res, body) {
    console.log(body);
});
function updateHomePage() {
    var statusContainers = document.querySelectorAll(".status-container");
    statusContainers.forEach(function (statusContainer) {
        // (statusContainer.querySelector(".status") as HTMLParagraphElement).innerHTML = "weme"
        console.log(statusContainer.name);
    });
}
