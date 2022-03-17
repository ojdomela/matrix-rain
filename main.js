import Matrix from './matrix.js'

export function getRandChar() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const listOfChars = chars.split("")
    const randChar = listOfChars[Math.floor(Math.random() * listOfChars.length)]
    return randChar
}

const options = {
    canvas: document.getElementById("matrix"),
    fontSize: 14,
    fontFamily: "roboto",
    animationSpeed: 75,
    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}",
    dropPercentage: 75,
    charChangeRate: 10,
    opacityChangeRate: 5,
    fadedPercentage: 5,
    hiddenPercentage: 35,
}

const matrix = new Matrix(options)
const runBtn = document.querySelector('#run')
const disableBtn = document.querySelector('#disable')
runBtn.onclick = matrix.run
disableBtn.onclick = matrix.disable