// checks for there strings and ensure they match three set of regex
const allMatchRegex = (inputs) => {
    const pattersnToMatch = [/hey/, /bee/, /cee/]
    return pattersnToMatch.filter((pattern, index) => {
        return pattern.test(inputs[index]?.value)
    }).length === 3
}

// main
(() => {
    const inputs = document.querySelectorAll("input")
    const messageBox = document.querySelector("button")

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            const isMatched = allMatchRegex(inputs)
            // console.log(isMatched)
            if (isMatched) {
                messageBox.classList.remove("btn-danger")
                messageBox.classList.add("btn-success")
                messageBox.innerText = "Validated..."
            } else {
                messageBox.classList.remove("btn-success")
                messageBox.classList.add("btn-danger")
                messageBox.innerText = "Not Validated..."
            }
        })
    })

})();