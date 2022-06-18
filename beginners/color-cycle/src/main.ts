const startButton = document.getElementById("start-button") as HTMLButtonElement
const redInput = document.getElementById("red") as HTMLInputElement
const greenInput = document.getElementById("green") as HTMLInputElement
const blueInput = document.getElementById("blue") as HTMLInputElement
const incrementalValue = document.getElementById("increment") as HTMLInputElement

let colorCode: string

// confirm that number can be converted to hexaecimal and is less than 255
const isHexa = (str: string) => {
  const number = parseInt(str, 16)

  if (number <= 255 || number >= 0) {
    return true
  }
  return false
}


// function to increment the hex figure by a number
const incrementHexa = (current: number, incremental: number) => {
  const newNum = current + incremental

  if (newNum <= 255 || newNum >= 0) return newNum
  return (newNum - 255).toString(16)
}

startButton.addEventListener("click", () => {
  let redValue = redInput.value 
  let greenValue = greenInput.value
  let blueValue = blueInput.value

  if (isHexa(redValue) && isHexa(greenValue) && isHexa(blueValue)) {
    colorCode = redValue + greenValue + blueValue 

    setInterval(() => {
      redValue = incrementHexa(parseInt(redValue, 16), Number(incrementalValue.value) || 20).toString(16)
      greenValue = incrementHexa(parseInt(greenValue, 16), Number(incrementalValue.value) || 20).toString(16)
      blueValue = incrementHexa(parseInt(blueValue, 16), Number(incrementalValue.value) || 20).toString(16)

      colorCode = redValue+greenValue+blueValue

      console.log(colorCode)

    }, 250)
  }
})

