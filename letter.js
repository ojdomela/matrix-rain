import { getRandChar } from "./main.js"

export default class Letter {
    constructor(ctx, y, options) {
        this.context = ctx
        this.char = getRandChar();
        this.x = options.position * options.fontSize
        this.y = y * options.fontSize;
        this.opacity = Math.floor(Math.random() * 100) / 100
        this.charChangeRate = options.charChangeRate
        this.opacityChangeRate = options.opacityChangeRate
        this.hiddenDecimalOdds = options.hiddenPercentage / 100
        this.fadedDecimalOdds = options.fadedPercentage / 100 + options.hiddenPercentage / 100
    }

    draw() {
        // Calculates for new char
        const newCharChance = Math.floor(Math.random() * 100)
        if (newCharChance < this.charChangeRate) this.char = getRandChar();

        // Calculates for new opacity
        const newOpacityChance = Math.floor(Math.random() * 100)
        if (newOpacityChance < this.opacityChangeRate) this.opacity = Math.floor(Math.random() * 100) / 100

        // Applies opacity, paints the character and then resets opacity
        this.context.globalAlpha = this.opacity < this.hiddenDecimalOdds ? 0 : this.opacity < this.fadedDecimalOdds ? 0.5 : 1;
        this.context.fillText(this.char, this.x, this.y)
        this.context.globalAlpha = 1;
    }
}