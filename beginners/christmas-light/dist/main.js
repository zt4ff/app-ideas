"use strict";
const bulbs = [
    "path7990",
    "path7974",
    "path7986",
    "path7966",
    "path7980",
    "path7994",
    "path7970",
    "path7998",
    "path7950",
    "path7962",
    "path8002",
    "path8046",
];
const colors = [
    "#FBF21A",
    "#0A53DE",
    "#0A53DE",
    "#8934B8",
    "#FB6F24",
    "#EA0D0D",
    "#24D024",
    "#8934B8",
    "#FB6F24",
    "#24D024",
    "#FBF21A",
    "#EA0D0D",
];
function generalStyeTree() {
    document.getElementById("path8006").style.fill = "#ffdd45";
    document.getElementById("path8006").style.filter =
        "drop-shadow(rgb(255, 221, 69) 1px 10px 14px)";
    const ropesID = ["path8077_1_", "path8087_1_", "path8091_1_", "path8101_1_"];
    // style ropes
    ropesID.forEach((ropeID) => {
        document.getElementById(ropeID).style.fill = "#ff0000";
    });
    // style general tree
    document.getElementById("path8016").style.fill = "#00ff00";
    // style trunk
    document.getElementById("path8061").style.fill = "#D2691E";
    bulbs.forEach((bulb, ind) => {
        document.getElementById(bulb).style.fill = colors[ind];
    });
}
function glow(seconds) {
    bulbs.forEach((bulb, ind) => {
        setInterval(() => {
            document.getElementById(bulb).style.filter = `drop-shadow(${colors[ind]} 1px 10px 14px)`;
            document.getElementById(bulb).style.stroke = "none";
        }, (seconds * 1000) / 2 + ind * 12);
        setInterval(() => {
            document.getElementById(bulb).style.stroke = "#000000";
            document.getElementById(bulb).style.filter = "none";
        }, seconds * 1000 + ind * 12);
    });
}
function main() {
    const powerButton = document.getElementById("power-button");
    let isPowerOn = false;
    powerButton.addEventListener("click", () => {
        if (isPowerOn) {
        }
        else {
            isPowerOn = true;
            powerButton.innerText = "Coming Soon";
            powerButton.disabled = true;
            generalStyeTree();
            glow(0.3);
        }
    });
    // generalStyeTree();
    // glow(0.3);
}
main();
// filter: drop-shadow(2px 2px 14px red);
