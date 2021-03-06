let player = new Player(20, 250)
let bot = new Bot(700-40, 250);
let ball = new Ball()

let points = 0;
let pointsBot = 0;
let mouse = new Mouse();
let stateMachine = new StateMachine()

let replayIcon;
let crownIcon;
let homeIcon;
let playIcon;

function setup() {
    createCanvas(700, 500);
    initFaceRecog(mouse, stateMachine)
    points = 0;
    frameRate(60)

    crownIcon = loadImage('assets/crown.png');
    replayIcon = loadImage('assets/replay.png');
    homeIcon = loadImage('assets/home.png');
    playIcon = loadImage('assets/play.png');

}

function draw() {
    background(42);

    stateMachine.displayUI()

    mouse.paint();
    mouse.drawButtonPressBar()


}

function resetObjects() {
    player.reset(20, 250)
    bot = new Bot(700-40, 250);
    ball = new Ball()
}

function resetGame() {
    points = 0
    pointsBot = 0
    resetObjects()
}


// function mouseMoved() {
//     player.setY(mouseY)
//   }