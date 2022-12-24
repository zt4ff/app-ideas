"use strict";
fetch("https://www.githubstatus.com/api/v2/components.json")
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    updateHomePage(data);
});
function updateHomePage(data) {
    const statusContainers = document.querySelectorAll(".status-container");
    statusContainers.forEach((statusContainer) => {
        const statusElement = statusContainer.querySelector(".status");
        const status = data.components.find((d) => d.name === statusContainer.getAttribute("name")).status;
        statusElement.innerHTML = status;
    });
}
console.log("welcome home");
