const getRotateCode = (type: "x" | "y", deg: number | string) => {
  const rotateStye = `rotate3d(${type == "y" ? "1, 0, 0" : "0, 1, 0"}, ${deg}deg)`
  return rotateStye
};



const imageContainer = document.querySelector(".img") as HTMLDivElement

let xRotateStyle = "rotate3d(0, 1, 0, 0deg)", yRotateStyle = "rotate3d(1, 0, 0, 0deg)";


["x-axis", "y-axis"].forEach(axis => {
  (document.querySelector(`.${axis}`) as HTMLInputElement).addEventListener("change", event => {
    const element = event.target  as HTMLInputElement

    if (element.name === "x") {
      xRotateStyle = getRotateCode("x", element.value)
    } else {
      yRotateStyle = getRotateCode("y", element.value)
    }

    imageContainer.style.transform = `${yRotateStyle} ${xRotateStyle}`
  })
})