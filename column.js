import { getRandChar } from "./main.js"
import Letter from "./letter.js"

export default class Column {
    constructor(ctx, position, ctxHeight, fontSize, letterOptions, finalWordChar) {
        this.context = ctx
        this.fontSize = fontSize
        this.completed = false
        this.reused = false
        this.height = ctxHeight
        this.position = position
        this.y = 0
        this.letters = []
        this.letterOptions = {
            ...letterOptions,
            position: position,
        }
        this.finalWordChar = finalWordChar
        this.draw.bind(this)
    }

    draw() {
        this.context.fillStyle = "rgb(55,255,55)"
        if (this.completed) {
            this.empty()
        } else if (this.finalWordChar) {
            this.finalize()
        } else {
            this.fill()
        }
    }

    empty() {
        this.letters.shift()
        if (this.letters.length === 0) this.cleared = true;
        this.letters.forEach(letter => letter.draw())
    }

    fill() {
        this.context.fillStyle = "rgb(255,255,255)"
        this.context.fillText(getRandChar(), this.position * this.fontSize, this.y + this.fontSize)
        this.context.fillStyle = "rgb(55,255,55)"
        this.letters.push(new Letter(this.context, this.letters.length, this.letterOptions))
        this.letters.forEach(letter => letter.draw())
        this.y += this.fontSize
        if (this.y > this.height) {
            this.completed = true
            this.y = 0;
            this.letters.shift()
        }
    }

    finalize() {
        if (!this.completed) {
            this.context.fillStyle = "rgb(255,255,255)"
            this.context.fillText(getRandChar(), this.position * this.fontSize, this.y + this.fontSize)
            this.context.fillStyle = "rgb(55,255,55)"
            this.letters.push(new Letter(this.context, this.letters.length, this.letterOptions))
        }
        this.letters.forEach(letter => letter.draw())
        this.y += this.fontSize
        if (this.y > this.finalWordChar.y) {
            this.completed = true
            this.reused = true
            if (this.letters.length > 1) this.letters.shift()
        }
    }
}