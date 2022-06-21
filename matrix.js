import Column from './column.js'


// The code quality of this class is like the sun
// Looking at it for prolonged periods may damage your eyesight

export default class Matrix {
    constructor(options) {
        this.canvas = options.canvas
        this.canvasStyle = window.getComputedStyle(options.canvas)
        this.ctx = options.canvas.getContext("2d")
        this.fontSize = options.fontSize
        this.fontFamily = options.fontFamily
        this.font = `${options.fontSize}px ${options.fontFamily}`
        this.animationSpeed = options.animationSpeed
        this.chars = options.chars.split("")
        this.dropRate = options.dropPercentage / 100
        this.letterOptions = {
            fontSize: options.fontSize,
            opacityChangeRate: options.opacityChangeRate,
            charChangeRate: options.charChangeRate,
            hiddenPercentage: options.hiddenPercentage,
            fadedPercentage: options.fadedPercentage,
        }
        this.word = options.word
        this.ending = false
        this.finished = false

        // set canvas width and height + dependant values
        this.canvas.height = Number(this.canvasStyle.height.slice(0, this.canvasStyle.height.length - 2))
        this.canvas.width = Number(this.canvasStyle.width.slice(0, this.canvasStyle.width.length - 2))
        this.canvasRatio = this.canvas.width / this.canvas.height
        this.activeColumns = []
        this.availableColumns = []
        for (let i = 0; i < (this.canvas.width / this.fontSize); i++) {
            this.availableColumns[i] = i - 0.01;
        }

        const wordPosition = this.word[0].split("").map((char, index) => {
            if (char === "") return
            return {
                char,
                index: 2 * index
            }
        })

        // if the word fits, determine starting index
        if (this.availableColumns.length >= ((wordPosition.length * 2) + 5)) {
            this.wordIndex = Math.floor((this.availableColumns.length - (wordPosition.length * 2 - 1)) / 2)
        } else {
            // TODO error handling for lengthy words
            console.log("no fit!")
        }

        this.wordColumns = []
        for (let i = 0; i < wordPosition.length; i++) {
            const columnIndex = this.wordIndex + wordPosition[i].index
            this.wordColumns.push(this.availableColumns[columnIndex])
        }
        this.wordHeight = Math.floor(this.canvas.height / this.fontSize / 2)
        console.log(this.wordColumns)
        console.log(this.availableColumns)

        this.run = this.run.bind(this)
        this.disable = this.disable.bind(this)
        this.stop = this.stop.bind(this)
        this.greet = this.greet.bind(this)
        this.clear()

        // TODO - bind this to new matrix instead later
        window.onresize = this.stop
    }

    clear() {
        window.cancelAnimationFrame(this.loop)
        this.ctx.fillStyle = "#000000"
        this.ctx.font = this.font
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    disable() {
        this.ending = true;
    }

    generateColumn() {
        if (this.clearing) return
        const dropOdds = Math.floor(Math.random() * 100) / 100
        if (dropOdds >= this.dropRate) return
        this.x = this.availableColumns.splice(Math.floor(Math.random() * this.availableColumns.length), 1)
        if (this.x[0]) {
            console.log(this.x[0])
            console.log(this.wordColumns)
            console.log(this.wordColumns.find(position => position === this.x[0]))
            this.activeColumns.push(
                new Column(this.ctx, this.x[0], this.canvas.height, this.fontSize, this.letterOptions)
            )
        }
    }

    // controls amount of columns spawned proportional to ratio: wide canvas gets more columns, thin canvas gets less
    generateRain() {
        if (this.canvasRatio <= 1) {
            const noColumnChance = Math.floor(Math.random() * 100) / 100
            if (noColumnChance < this.canvasRatio) this.generateColumn()
        } else {
            this.generateColumn()
        }

        const extraColumnChance = Math.floor(Math.random() * 100) / 100
        let canvasRatio = this.canvasRatio
        while (extraColumnChance < canvasRatio--) {
            this.generateColumn()
        }
    }

    greet() {
        this.word[0].split("").forEach((letter, index) => {
            this.ctx.fillStyle = "rgb(55,255,55)"
            this.ctx.fillText(letter, this.wordColumns[index] * this.fontSize, this.wordHeight * this.fontSize)
        });
    }

    render(time) {
        this.iteration = Math.floor(time / this.animationSpeed)
        if (this.previous === this.iteration) return
        this.previous = this.iteration
        this.clear()

        if (!this.ending) this.generateRain()

        while (this.activeColumns[0]?.cleared) {
            this.activeColumns.shift()
        }

        this.activeColumns.forEach(column => {
            column.draw()
            if (column.completed && !column.reused) {
                column.reused = true;
                this.availableColumns.push(column.position)
            }
        })
    }

    run(time) {
        if (this.finished) this.finished = false;

        if (!this.ending || this.activeColumns.length > 0) {
            this.render(time)
            this.loop = window.requestAnimationFrame(this.run)
        } else {
            this.finished = true;
            this.ending = false;
        }
    }

    stop() {
        this.clear()
        this.activeColumns = []
        this.availableColumns = []
        for (let i = 0; i < (this.canvas.width / this.fontSize); i++) {
            this.availableColumns[i] = i - 0.5;
        }
    }
}