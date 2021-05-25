
class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.l = 10;
        this.isHoldingClick = false;
        this.buttonHoldCount = 0;
        this.buttonHoldBarSizePercent = 0;
    }

    incrementButtonHoldCount() { this.buttonHoldCount++; }
    clearButtonHoldCount() { this.buttonHoldCount = 0; }
    getButtonHoldCount() { return this.buttonHoldCount; }

    setButtonHoldBarSizePercent(percent) { this.buttonHoldBarSizePercent = percent; }

    newPos(x, y) {
        const c1 = Math.abs(x - this.x)
        const c2 = Math.abs(y - this.y)
        let dist = Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2))

        if(dist > 10) {
            this.x = x;
            this.y = y;
        }

    }

    paint() {
        stroke(255)
        strokeWeight(1)
        fill(114, 213, 255)
        ellipse(this.x, this.y, this.l)
        strokeWeight(0)
    }

    getX() { return this.x; }
    getY() { return this.y; }

    setIsHoldingClick(val) {this.isHoldingClick = val; }

    drawButtonPressBar() {
        let barPercentage = this.buttonHoldCount * 200 * 100 / 3000
        
        let size = 596 * barPercentage / 100
        fill(255)
        rect(2, 478, size, 20)
    }
}