// function to update the property
const setAxis = (type: "x" | "y", deg: number) => {
  const rotateStye = `rotate3d(${type == "y" ? "1, 0, 0" : "0, 1, 0"}, ${deg}deg)`
  const r = document.querySelector(":root") as HTMLDivElement
  r.style.setProperty(`--${type}-axis`, rotateStye);
  console.log(rotateStye)
};

setAxis("x", 40)