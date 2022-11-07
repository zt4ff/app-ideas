"use strict";
// function to update the property
const setAxis = (type, deg) => {
    const rotateStye = `rotate3d(${type == "y" ? "1, 0, 0" : "0, 1, 0"}, ${deg}deg)`;
    const r = document.querySelector(":root");
    r.style.setProperty(`--${type}-axis`, rotateStye);
};
// setAxis("y", 30)
