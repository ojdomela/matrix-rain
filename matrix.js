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

        this.active = true;
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
        this.clear = this.clear.bind(this)
        this.clear()
    }

    disable() {
        this.active = false;
    }

    clear() {
        this.ctx.fillStyle = "#000000"
        this.ctx.font = this.font
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    generateColumn() {
        const dropOdds = Math.floor(Math.random() * 100) / 100
        if (dropOdds >= this.dropRate) return
        this.x = this.availableColumns.splice(Math.floor(Math.random() * this.availableColumns.length), 1)
        if (this.x[0] && dropOdds < this.dropRate) this.activeColumns.push(new Column(this.ctx, this.x[0], this.canvas.height, this.fontSize, this.letterOptions))
    }

    run(time) {
        this.render(time)
        if (this.active) window.requestAnimationFrame(this.run)
        if (!this.active) this.active = true
    }

    render(time) {
        this.iteration = Math.floor(time / this.animationSpeed)
        if (this.previous === this.iteration) return
        this.previous = this.iteration
        this.clear()

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
        this.activeColumns.forEach((column, index) => {
            column.draw()
            if (column.completed && !column.reused) {
                column.reused = true;
                this.availableColumns.push(column.position)
            }
        })
        while (this.activeColumns[0]?.cleared) {
            this.activeColumns.shift()
        }
    }
}