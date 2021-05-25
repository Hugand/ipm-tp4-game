
class Bot {
    h = 100;
    w = 14;
    speed = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        && ball.getX() + ball.getR() >= this.x && ball.getX() + ball.getR() <= this.x + this.w) {
            ball.xDirToLeft();
            
            if(Math.random() < 0.35)
                ball.reverseYDir();
        }
    }

    setRandomSpeed = () => {
        this.speed = Math.floor(Math.random() * 10) + 5
    }

    activateMovement = () => {
        if(ball.getX() > 500) {
            this.setRandomSpeed()

            if(ball.getY() < this.y + this.h/2)
                this.speed *= -1;
            
        } else if(ball.getX() <= 300)
            this.speed = 0;
    }

    move = () => {
        if(this.y + this.speed + this.h > 500)
            this.y = 500 - this.h;

        if(this.y + this.speed < 0)
            this.y = 0;

        this.y += this.speed;
    }
}