
class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.l = 10;
        this.isHoldingClick = false;
    }

    newPos(x, y) {
        const c1 = Math.abs(x - this.x)
        const c2 = Math.abs(y - this.y)
        let dist = Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2))

        if(dist > 10) {
            this.x = x;
            this.y = y;
        } 
        // else {
        //     // const corner = { x: this.x, y: y }
        //     // const midCoord = {
        //     //     x: corner.x + Math.abs(x - corner.x) / 4,
        //     //     y: corner.y + Math.abs(corner.y - this.y) / 4
        //     // }

        //     // this.x = midCoord.x
        //     // this.y = midCoord.y
        // }

    }

    paint() {
        // fill(200, 30, 30)
        fill(250, 20, 20)
        ellipse(this.x, this.y, this.l)
    }

    getX() { return this.x; }
    getY() { return this.y; }

    setIsHoldingClick(val) {this.isHoldingClick = val; }
}