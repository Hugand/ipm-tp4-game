let player = new Player(20, 250)
let bot = new Bot(600-40, 250);
let ball = new Ball()

let points = 0;
let pointsBot = 0;
let mouse = new Mouse();
let stateMachine = new StateMachine()

let replayIcon;
let crownIcon;

function setup() {
    createCanvas(600, 500);
    initFaceRecog(mouse)
    points = 0;
    frameRate(60)

    crownIcon = loadImage('assets/crown.png');
    replayIcon = loadImage('assets/replay.png');

}

function draw() {
    background(42);

    stateMachine.displayUI()

    mouse.paint();


}

function resetObjects() {
    player.reset(20, 250)
    bot = new Bot(600-40, 250);
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