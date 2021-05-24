
class Ball {
    x = 300;
    y = 250;
    speed = 4;
    l = 20
    // xDir
    // yDir
    constructor() {
        if(Math.floor(Math.random()) == 1)
            this.xDir = this.speed
        else
            this.xDir = -this.speed


        if(Math.floor(Math.random()) == 1)
            this.yDir = this.speed
        else
            this.yDir = -this.speed
    }

    move() {
        this.x += this.xDir;
        this.y += this.yDir;

        if(this.hitLeftWall() || this.hitRightWall())
            this.reverseXDir()
    
        if(this.y <= this.getR() || this.y >= 500-this.getR())
            this.reverseYDir()
    }

    hitRightWall = () => {
        return this.x >= 600-this.getR()
    }

    hitLeftWall = () => {
        return this.x <= this.getR()
    }

    paint() {
        fill(255);
        ellipse(this.x, this.y, this.l)
    }

    getX = () => this.x;
    getY = () => this.y;
    getL = () => this.l;
    getR = () => this.l/2;

    reverseXDir = () => {
        this.xDir *= -1;
        console.log(this.xDir)
    }

    reverseYDir = () => {
        this.yDir *= -1;
    }

    xDirToRight = () => {
        this.xDir = this.speed;
    }

    xDirToLeft = () => {
        this.xDir = -this.speed;
    }
}