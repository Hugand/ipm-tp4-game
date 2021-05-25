const states = {
    LOADING: 'loading',
    MENU: 'menu',
    GAME: 'game',
    GAMEOVER: 'gameover'
}

const playerType = {
    BOT: 'bot',
    PLAYER: 'player'
}

class StateMachine {
    currentState = states.GAME
    buttonHold = 0;

    displayUI() {
        switch(this.currentState) {
            case states.LOADING:
                this.uiLoading();
                break;
            case states.MENU:
                this.uiMenu();
                break;
            case states.GAME:
                this.uiGame();
                break;
            case states.GAMEOVER:
                this.uiGameOver();
                break;
        }
    }

    uiLoading() {
        fill(255)
        textSize(34)
        text('Loading api...', 220, 260);
    }

    uiMenu() {
        fill(255)
        textSize(50)
        text('PONG!', 270, 140);

        stroke(255)
        strokeWeight(4)
        fill(42)
        rect(283, 240, 136, 136)
        image(playIcon, 300, 290 - 34, 100, 100)
        strokeWeight(0)

        if(this.isMouseClickingStartBtn(mouse) && mouse.getButtonHoldCount() == 0) {
            mouse.setIsHoldingClick(true)
            mouse.incrementButtonHoldCount()

            let interval = setInterval(() => {
                if(this.isMouseClickingStartBtn(mouse)) {
                    mouse.setIsHoldingClick(true)
                    
                    if(mouse.getButtonHoldCount() === 15) {
                        clearInterval(interval)
                        mouse.setIsHoldingClick(false)
                        mouse.clearButtonHoldCount()
                        this.clickStartButton()
                    } else { 
                        mouse.incrementButtonHoldCount()
                    }
                } else {
                    mouse.setIsHoldingClick(false)
                    mouse.clearButtonHoldCount()
                    clearInterval(interval)
                }
            }, 200)
        }
    }

    uiGame() {
        textAlign("center")
        textSize(44);
        text(points, 200, 100)
        text(pointsBot, 480, 100)

        textSize(18);
        text("Jogador", 200, 130)
        text("Bot", 480, 130)
        textAlign("left")

        ball.move();
        bot.activateMovement()
        bot.move(ball)

        player.paint()
        bot.paint()
        ball.paint();

        player.setY(mouse.getY() - player.getH()/2)

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

        this.handleWin()
    }

    uiGameOver() {
        strokeWeight(0)
        fill(255)
        textSize(48)
        textAlign('center')
        text('Game Over', 350, 90)
        textAlign('left')

        let winningUser = '';
        let crownYPos;

        points = 10

        if(pointsBot == 10) {
            crownYPos = 180 - 24
        } else if(points == 10) {
            crownYPos = 140 - 24
        }

        textSize(28)
        text(winningUser, 270, 170)

        text('Jogador: ' + points, 280, 140)
        text('Bot: ' + pointsBot, 280, 180)

        image(crownIcon, 230, crownYPos, 34, 28)

        stroke(255)
        strokeWeight(4)
        fill(42)
        rect(383, 240, 136, 136)
        image(replayIcon, 400, 290 - 34, 100, 100)
        rect(183, 240, 136, 136)
        image(homeIcon, 200, 290 - 34, 100, 100)
        strokeWeight(0)

        // Replay click listener
        if(this.isMouseClickingReplayBtn(mouse) && mouse.getButtonHoldCount() == 0) {
            mouse.setIsHoldingClick(true)
            mouse.incrementButtonHoldCount()

            let interval = setInterval(() => {
                if(this.isMouseClickingReplayBtn(mouse)) {
                    mouse.setIsHoldingClick(true)
                    
                    if(mouse.getButtonHoldCount() === 15) {
                        clearInterval(interval)
                        mouse.setIsHoldingClick(false)
                        mouse.clearButtonHoldCount()
                        this.clickReplayButton()
                    } else { 
                        mouse.incrementButtonHoldCount()
                    }
                } else {
                    mouse.setIsHoldingClick(false)
                    mouse.clearButtonHoldCount()
                    clearInterval(interval)
                }
            }, 200)
        }

        // Home button click listener
        if(this.isMouseClickingHomeBtn(mouse) && mouse.getButtonHoldCount() == 0) {
            mouse.setIsHoldingClick(true)
            mouse.incrementButtonHoldCount()

            let interval = setInterval(() => {
                if(this.isMouseClickingHomeBtn(mouse)) {
                    mouse.setIsHoldingClick(true)
                    
                    if(mouse.getButtonHoldCount() === 15) {
                        clearInterval(interval)
                        mouse.setIsHoldingClick(false)
                        mouse.clearButtonHoldCount()
                        this.clickHomeButton()
                    } else { 
                        mouse.incrementButtonHoldCount()
                    }
                } else {
                    mouse.setIsHoldingClick(false)
                    mouse.clearButtonHoldCount()
                    clearInterval(interval)
                }
            }, 200)
        }

    }

    clickStartButton() {
        this.currentState = states.GAME
    }

    clickReplayButton() {
        resetGame()
        this.currentState = states.GAME
    }

    clickHomeButton() {
        resetGame()
        this.currentState = states.MENU
    }

    isMouseClickingStartBtn(mouse) {
        return mouse.getX() >= 283 && mouse.getX() <= 419 && mouse.getY() >= 240 && mouse.getY() <= 376;
    }

    isMouseClickingReplayBtn(mouse) {
        return mouse.getX() >= 383 && mouse.getX() <= 419 && mouse.getY() >= 240 && mouse.getY() <= 376;
    }

    isMouseClickingHomeBtn(mouse) {
        return mouse.getX() >= 183 && mouse.getX() <= 319 && mouse.getY() >= 240 && mouse.getY() <= 376;
    }

    handleWin() {
        if(pointsBot == 10 || points == 10)
            this.currentState = states.GAMEOVER;
    }

    finishLoadingApi() {
        this.currentState = states.MENU;
    }

}