import { getRandChar } from "./main.js"
import Letter from "./letter.js"

export default class Column {
    constructor(ctx, position, ctxHeight, fontSize, letterOptions, wordOptions) {
        this.context = ctx
        this.fontSize = fontSize
        this.completed = false
        this.reused = false
        this.height = ctxHeight
        this.position = position
        this.y = 0
        this.letters = []
        this.letterOptions = letterOptions
        this.wordOptions = wordOptions
        this.draw.bind(this)
    }

    draw() {
        this.context.fillStyle = "rgb(55,255,55)"
        if (this.completed) {
            this.empty()
        } else if (this.wordOptions) {
            this.finalize()
        } else {
            this.fill()
        }
    }

    empty() {
        this.letters.shift()
        if (this.letters.length === 0) this.cleared = true;
        this.letters.forEach(letter => letter.draw(this.context, this.position * this.fontSize, letter.y * this.fontSize))
    }

    fill() {
        this.context.fillStyle = "rgb(255,255,255)"
        this.context.fillText(getRandChar(), this.position * this.fontSize, this.y + this.fontSize)
        this.context.fillStyle = "rgb(55,255,55)"
        this.letters.push(new Letter(this.letters.length, this.letterOptions))
        this.letters.forEach((letter, index) => letter.draw(this.context, this.position * this.fontSize, index * this.fontSize))
        this.y += this.fontSize
        if (this.y > this.height) {
            this.completed = true
            this.y = 0;
            this.letters.shift()
        }
    }

    finalize() {

    }
}