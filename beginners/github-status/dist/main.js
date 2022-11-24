"use strict";
const getRotateCode = (type, deg) => {
    const rotateStye = `rotate3d(${type == "y" ? "1, 0, 0" : "0, 1, 0"}, ${deg}deg)`;
    return rotateStye;
};
const imageContainer = document.querySelector(".img");
let xRotateStyle = "rotate3d(0, 1, 0, 0deg)", yRotateStyle = "rotate3d(1, 0, 0, 0deg)";
["x-axis", "y-axis"].forEach(axis => {
    document.querySelector(`.${axis}`).addEventListener("change", event => {
        const element = event.target;
        if (element.name === "x") {
            xRotateStyle = getRotateCode("x", element.value);
        }
        else {
            yRotateStyle = getRotateCode("y", element.value);
        }
        imageContainer.style.transform = `${yRotateStyle} ${xRotateStyle}`;
    });
});
