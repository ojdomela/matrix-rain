import { getRandChar } from "./main.js"

export default class Letter {
    constructor(position, options) {
        this.char = getRandChar();
        this.y = position;
        this.opacity = Math.floor(Math.random() * 100) / 100
        this.charChangeRate = options.charChangeRate
        this.opacityChangeRate = options.opacityChangeRate
        this.hiddenDecimalOdds = options.hiddenPercentage / 100
        this.fadedDecimalOdds = options.fadedPercentage / 100 + options.hiddenPercentage / 100
    }

    draw(ctx, x, y) {
        const newCharChance = Math.floor(Math.random() * 100)
        if (newCharChance < this.charChangeRate) this.char = getRandChar();
        const newOpacityChance = Math.floor(Math.random() * 100)
        if (newOpacityChance < this.opacityChangeRate) this.opacity = Math.floor(Math.random() * 100) / 100
        ctx.globalAlpha = this.opacity < this.hiddenDecimalOdds ? 0 : this.opacity < this.fadedDecimalOdds ? 0.5 : 1;
        ctx.fillText(this.char, x, y)
        ctx.globalAlpha = 1;
    }
}
