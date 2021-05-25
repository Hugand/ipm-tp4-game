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
        text('Game Over', 170, 90)

        points = 10

        let winningUser = '';
        let crownYPos;

        if(pointsBot == 10) {
            crownYPos = 180 - 24
        } else if(points == 10) {
            crownYPos = 140 - 24
        }

        textSize(28)
        text(winningUser, 220, 170)

        text('Jogador: ' + points, 230, 140)
        text('Bot: ' + pointsBot, 230, 180)

        image(crownIcon, 180, crownYPos, 34, 28)

        stroke(255)
        strokeWeight(4)
        fill(42)
        rect(333, 240, 136, 136)
        image(replayIcon, 350, 290 - 34, 100, 100)
        rect(133, 240, 136, 136)
        image(homeIcon, 150, 290 - 34, 100, 100)
        strokeWeight(0)


        if(this.isMouseClickingReplayBtn(mouse)) {
            mouse.setIsHoldingClick(true)
            let nHoldReplayChecks = 0;

            let interval = setInterval(() => {
                if(this.isMouseClickingReplayBtn(mouse)) {
                    mouse.setIsHoldingClick(true)
                    
                    if(nHoldReplayChecks === 15) {
                        clearInterval(interval)
                        mouse.setIsHoldingClick(false)
                        this.clickReplayButton()
                    } else { 
                        nHoldReplayChecks++;
                    }
                } else {
                    mouse.setIsHoldingClick(false)
                    clearInterval(interval)
                }
            }, 200)
        }


        if(this.isMouseClickingHomeBtn(mouse)) {
            mouse.setIsHoldingClick(true)
            let nHoldHomeChecks = 0;

            let interval = setInterval(() => {
                if(this.isMouseClickingHomeBtn(mouse)) {
                    mouse.setIsHoldingClick(true)
                    
                    if(nHoldHomeChecks === 15) {
                        clearInterval(interval)
                        mouse.setIsHoldingClick(false)
                        this.clickHomeButton()
                    } else { 
                        nHoldHomeChecks++;
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

    clickHomeButton() {
        resetGame()
        this.currentState = states.MENU
    }

    isMouseClickingStartBtn(mouse) {
        return mouse.getX() >= 100 && mouse.getX() <= 500 && mouse.getY() >= 200 && mouse.getY() <= 370;
    }

    isMouseClickingReplayBtn(mouse) {
        return mouse.getX() >= 333 && mouse.getX() <= 469 && mouse.getY() >= 240 && mouse.getY() <= 376;
    }

    isMouseClickingHomeBtn(mouse) {
        return mouse.getX() >= 133 && mouse.getX() <= 269 && mouse.getY() >= 240 && mouse.getY() <= 376;
    }

    handleWin() {
        if(pointsBot == 10 || points == 10)
            this.currentState = states.GAMEOVER;
    }
}