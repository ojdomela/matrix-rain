import Column from './column.js'

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
            opacityChangeRate : options.opacityChangeRate,
            charChangeRate : options.charChangeRate,
            hiddenPercentage : options.hiddenPercentage,
            fadedPercentage : options.fadedPercentage,
        }

        this.ending = false;
        this.finished = false;
        this.canvas.height = Number(this.canvasStyle.height.slice(0, this.canvasStyle.height.length - 2))
        this.canvas.width = Number(this.canvasStyle.width.slice(0, this.canvasStyle.width.length - 2))
        this.canvasRatio = this.canvas.width / this.canvas.height
        this.activeColumns = []
        this.availableColumns = []
        for (let i = 0; i < (this.canvas.width / this.fontSize); i++) {
            this.availableColumns[i] = i - 0.5;
        }
        this.textAlign = "center"
        this.run = this.run.bind(this)
        this.disable = this.disable.bind(this)
        this.clear()
    }

    disable() {
        this.ending = true;
    }

    clear() {
        this.ctx.fillStyle = "#000000"
        this.ctx.font = this.font
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    generateColumn() {
        if (this.clearing) return
        const dropOdds = Math.floor(Math.random() * 100) / 100
        if (dropOdds >= this.dropRate) return
        this.x = this.availableColumns.splice(Math.floor(Math.random() * this.availableColumns.length), 1)
        if (this.x[0] && dropOdds < this.dropRate) this.activeColumns.push(new Column(this.ctx, this.x[0], this.canvas.height, this.fontSize, this.letterOptions))
    }

    run(time) {
        if (this.finished) this.finished = false;
        
        if (!this.ending || this.activeColumns.length > 0) {
            console.time("render")
            console.log(this.ending)
            console.log(this.activeColumns)
            this.render(time)
            console.timeEnd("render")
            window.requestAnimationFrame(this.run)
        } else {
            this.finished = true;
            this.ending = false;
        }
    }

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
}