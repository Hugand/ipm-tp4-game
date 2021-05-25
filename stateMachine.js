const states = {
    MENU: 'menu',
    GAME: 'game',
    GAMEOVER: 'gameover'
}

const playerType = {
    BOT: 'bot',
    PLAYER: 'player'
}



class StateMachine {
    currentState = states.MENU
    buttonHold = 0;

    displayUI() {
        switch(this.currentState) {
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

    uiMenu() {
        fill(255)
        textSize(50)
        text('PONG!', 220, 140);

        fill(255)
        rect(100, 200, 400, 170)
        fill(12)
        text('Start!', 230, 300);

        if(this.isMouseClickingStartBtn(mouse)) {
            mouse.setIsHoldingClick(true)
            let nHoldChecks = 0;

            let interval = setInterval(() => {
                if(this.isMouseClickingStartBtn(mouse)) {
                    mouse.setIsHoldingClick(true)
                    
                    if(nHoldChecks === 15) {
                        clearInterval(interval)
                        mouse.setIsHoldingClick(false)
                        this.clickStartButton()
                    } else { 
                        nHoldChecks++;
                    }
                } else {
                    mouse.setIsHoldingClick(false)
                    clearInterval(interval)
                }
            }, 200)
        }


    }

    uiGame() {
        textSize(44);
        text(points, 200, 100)
        text(pointsBot, 400, 100)

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
        text('Game Over', 170, 130)

        let winningUser = '';
        let crownYPos;

        if(pointsBot == 10) {
            winningUser = 'O pc ganhou'
            crownYPos = 330 - 24
        } else if(points == 10) {
            winningUser = 'Ganhaste!'
            crownYPos = 290 - 24
        }

        textSize(28)
        text(winningUser, 220, 170)

        text('Jogador: ' + points, 100, 290)
        text('Bot: ' + pointsBot, 100, 330)

        image(crownIcon, 60, crownYPos, 34, 28)

        stroke(255)
        strokeWeight(4)
        fill(42)
        rect(383, 240, 136, 136)
        image(replayIcon, 400, 290 - 34, 100, 100)

        if(this.isMouseClickingReplayBtn(mouse)) {
            mouse.setIsHoldingClick(true)
            let nHoldChecks = 0;

            let interval = setInterval(() => {
                if(this.isMouseClickingReplayBtn(mouse)) {
                    mouse.setIsHoldingClick(true)
                    
                    if(nHoldChecks === 15) {
                        clearInterval(interval)
                        mouse.setIsHoldingClick(false)
                        this.clickReplayButton()
                    } else { 
                        nHoldChecks++;
                    }
                } else {
                    mouse.setIsHoldingClick(false)
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

    isMouseClickingStartBtn(mouse) {
        return mouse.getX() >= 100 && mouse.getX() <= 500 && mouse.getY() >= 200 && mouse.getY() <= 370;
    }

    isMouseClickingReplayBtn(mouse) {
        return mouse.getX() >= 383 && mouse.getX() <= 519 && mouse.getY() >= 240 && mouse.getY() <= 376;
    }

    handleWin() {
        if(pointsBot == 10 || points == 10)
            this.currentState = states.GAMEOVER;
    }
}