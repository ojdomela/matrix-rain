import Matrix from './matrix.js'

// The canvas is still hard-coded for now
// All the below should end up customizable
const options = {
    canvas: document.getElementById("matrix"),
    fontSize: 20,
    animationSpeed: 75,
    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}",
    dropPercentage: 75,
    charChangeRate: 16,
    opacityChangeRate: 4,
    fadedPercentage: 25,
    hiddenPercentage: 25,
    word: ["Word?"]
}

// Create class and rudimentary buttons
const matrix = new Matrix(options)

const wordBtn = document.querySelector('#word')
wordBtn.onclick = matrix.greet

const runBtn = document.querySelector('#run')
runBtn.onclick = matrix.run

const disableBtn = document.querySelector('#disable')
disableBtn.onclick = matrix.disable

const clearBtn = document.querySelector('#clear')
clearBtn.onclick = matrix.stop

export function getRandChar() {
    const chars = options.chars;
    const listOfChars = chars.split("")
    const randChar = listOfChars[Math.floor(Math.random() * listOfChars.length)]
    return randChar
}