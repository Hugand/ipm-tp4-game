
class Player {
    h = 100;
    w = 14;

    constructor(x, y) {
        this.reset(x, y)
    }

    setY = (y) => {
        this.y = y;
    }

    paint = () => {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }

    collideWithBall = (ball) => {
        if(ball.getY() >= this.y && ball.getY() <= this.y + this.h
        && ball.getX() - ball.getR() <= this.x + this.w && ball.getX() - ball.getR() >= this.x) {
                console.log("collided")
                ball.xDirToRight();
                return true
            }

        return false
    }

    getH() { return this.h; }

    reset = (x, y) => {
        this.x = x;
        this.y = y;
    }
}