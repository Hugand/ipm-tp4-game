let player = new Player(20, 250)
let bot = new Bot(600-40, 250);
let ball = new Ball()

let points = 0;
let pointsBot = 0;

function setup() {
    createCanvas(600, 500);
    initFaceRecog(player)
    points = 0;
}

function draw() {
    background(42);

    textSize(44);
    text(points, 200, 100)
    text(pointsBot, 400, 100)

    ball.move();
    bot.activateMovement()
    bot.move(ball)

    player.paint()
    bot.paint()
    ball.paint();

    player.collideWithBall(ball)
    bot.collideWithBall(ball)

    if(ball.hitLeftWall()) {
        resetObjects()
        pointsBot++;
    }

    if(ball.hitRightWall()) {
        resetObjects()
        points++;
    }

}

function resetObjects() {
    player.reset(20, 250)
    bot = new Bot(600-40, 250);
    ball = new Ball()
}

// function mouseMoved() {
//     player.setY(mouseY)
//   }