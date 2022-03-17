import Matrix from './matrix.js'

export function getRandChar() {
    const chars = options.chars;
    const listOfChars = chars.split("")
    const randChar = listOfChars[Math.floor(Math.random() * listOfChars.length)]
    return randChar
}

const options = {
    canvas: document.getElementById("matrix"),
    fontSize: 18,
    fontFamily: "roboto",
    animationSpeed: 75,
    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}",
    dropPercentage: 30,
    charChangeRate: 16,
    opacityChangeRate: 4,
    fadedPercentage: 25,
    hiddenPercentage: 25,
}

const matrix = new Matrix(options)
const runBtn = document.querySelector('#run')
const disableBtn = document.querySelector('#disable')
runBtn.onclick = matrix.run
disableBtn.onclick = matrix.disable