
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
        }
    }

    setRandomSpeed = () => {
        this.speed = Math.floor(Math.random() * 15) + 8
    }

    activateMovement = () => {
        if(ball.getX() > 300 && this.speed == 0) {
            this.setRandomSpeed()

            if(ball.getY() < 250)
                this.speed *= -1;
        } else
            this.speed = 0;
    }

    move = (ball) => {

        if(this.y + this.h > 500)
            this.y = 500 - this.h;
        else if(this.y < 0)
            this.y = 0;
        else {
            if(ball.getY >= this.y + 20 && ball.getY() <= this.y + this.h - 20)
                this.y = ball.getY() - this.h/2;

            this.y += this.speed;
        }

    }
}