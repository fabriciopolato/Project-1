window.onload = () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let screenHeight = document.getElementById('canvas').clientHeight;
    let screenWidth = document.getElementById("canvas").clientWidth;

    let intervalClearScreen = 0;
    let intervalStartScreen = 0;
    //========================================================================

    //EVENT LISTENERS
    document.getElementById('btn-start').onclick = () => {
        intervalClearScreen = setInterval(clearScreen, 500)
        intervalStartScreen = setInterval(startScreen, 1000)
        intervalUpdateGame = setInterval(updateGame, 20)

    };
    document.getElementById('btn-restart').onclick = () => {
        restartGame();
    }
    window.addEventListener('resize', function () {
        screenWidth = document.getElementById("canvas").clientWidth;
        screenHeight = document.getElementById("canvas").clientHeight;

        canvas.width = screenWidth;
        canvas.height = screenHeight;
    })
    //============================================================================

    //PLAYER
    class Player {
        constructor(playerX) {
            this.playerWidth = screenHeight / 15;
            this.playerHeight = screenHeight / 15;
            this.playerX = playerX;
            this.playerY = screenHeight - this.playerHeight;
            this.playerRight = playerX + this.playerWidth;
            this.playerBottom = this.playerY + this.playerHeight;
            this.playerSpeed = 20;
            this.updatePosition = { left: false, right: false };
            document.addEventListener('keydown', (event) => this.keyDownEvent(event.keyCode));
            document.addEventListener('keyup', (event) => this.keyUpEvent(event.keyCode));
        }

        drawPlayer() {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
        }

        updatePlayer() {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
        }

        keyUpEvent(keyCode) {
            switch (keyCode) {
                case 37:
                    this.updatePosition.left = false;
                    break;
                case 39:
                    this.updatePosition.right = false;
                    break;
            }
        }

        keyDownEvent(keyCode) {
            switch (keyCode) {
                case 37:
                    this.updatePosition.left = true;
                    break;
                case 39:
                    this.updatePosition.right = true;
                    break;
            }
        }

        movePlayer() {
            if (this.updatePosition.left && this.playerX > screenWidth * 0.01) {
                this.playerX -= this.playerSpeed;
            }
            if (this.updatePosition.right && this.playerX < screenWidth * 0.6645) {
                this.playerX += this.playerSpeed;
            }
        }

        right() {
            return this.playerRight = this.playerX + this.playerWidth;
        }

        left() {
            return this.playerX = this.playerX
        }

        top() {
            return this.playerY = this.playerY;
        }

        bottom() {
            return this.playerBottom = this.playerY + this.playerHeight;
        }
    }
    //============================================================================

    //LETTER
    let letterSize = screenWidth / 35;

    class Letter {
        constructor() {
            //Math.round(Math.random() * (canvas.width - 20)) -- it selects a random X between 0 and canvas.width minus 20px (margin), so it can fit on the screen without passing it
            this.letterX = Math.round(Math.random() * (screenWidth * 0.65) + screenWidth * 0.03);
            this.letterY = -20;
            this.arrayLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z'];
            this.speedLetter = 5;
            this.letter = this.chooseLetter();
            letterSize = screenWidth / 35;
        }

        chooseLetter() {
            let randomIndex = Math.floor(Math.random() * this.arrayLetters.length);
            return this.arrayLetters[randomIndex];
        }

        drawAndMoveLetter() {
            if (this.letterY <= screenHeight) {
                this.letterY += this.speedLetter;
            } else {
                this.letterY = -20;
                this.letterX = Math.round(Math.random() * (screenWidth * 0.65) + screenWidth * 0.03);
                this.letter = this.chooseLetter();
            }
            writeText(this.letter, this.letterSize, 'white', this.letterX, this.letterY);
        }
    }

    //============================================================================
    //ARRAY OF WORDS (OBJECTS)
    let words = [
        {
            word: 'ABACAXI',
            hint1: '1) É uma fruta',
            hint2: '2) É azeda',
            hint3: '3) Tem coroa',
        },
        {
            word: 'BALEIA',
            hint1: '1) É um animal',
            hint2: '2) Mora no mar',
            hint3: '3) É grande',
        }
    ];

    //============================================================================

    let letter = [];
    let player = new Player(100);
    let count = 3;
    let startedGame = false;
    let startedScreen = false;
    let numOfCreatedLetters = 10;
    let playerLetters = [];
    let wrong = 0;
    let secretWord = chooseSecretWord();
    //let playerLetters = [];
    
    for (let i = 0; i < numOfCreatedLetters; i += 1) {
        letter[i] = new Letter();
    }


    function writeText(text, fontSize, color, positionX, positionY, fontfamily = 'Arial') {
        ctx.fillStyle = color;
        ctx.font = fontSize + 'px ' + fontfamily;
        ctx.fillText(text, positionX, positionY);
    }


    function startScreen() {
        clearScreen();
        writeText('ARE YOU READY?', screenWidth / 10, 'white', screenWidth / 2 - screenWidth / 2.3, screenHeight / 2 + 20);
        
        if (count === 2) {
            clearInterval(intervalClearScreen);
            clearInterval(intervalStartScreen)
            clearScreen();
            setTimeout(clearScreen, 1000);
            setTimeout(startGame, 1000);
            startedScreen = true;
        }
        return count--;
    }
    

    function chooseSecretWord() {
        return words[Math.floor(Math.random() * words.length)];
    }


    function drawLines() {
        let underline = screenWidth / 40;
        let spacing = screenWidth / 30;
    
        for(let i = 0; i < secretWord.word.length; i += 1){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(screenWidth - screenWidth / 3.7 + spacing * i, 1.8*screenHeight / 7 + 20);
            ctx.lineTo(screenWidth - screenWidth / 3.7 + underline + spacing*i, 1.8*screenHeight / 7 + 20);
            ctx.stroke();
        }
    }
   

    function startGame() {
        player.drawPlayer();
        startedGame = true;
    }


    function restartGame() {
        stop();
        clearScreen();
        startedScreen = true;
        playerLetters = [];
        count = 3;
        wrong = 0;
        startGame();
        intervalUpdateGame = setInterval(updateGame, 20)
        for(let i = 0; i < numOfCreatedLetters; i += 1) {
            letter[i].letterY = -20;
            letter[i].letterX = Math.round(Math.random() * (screenWidth - 20));
            letter[i].letter = letter[i].chooseLetter();
        }
        player.playerX = 100;
        player.playerY = screenHeight - player.playerHeight;
    }


    function clearScreen() {
        ctx.clearRect(-20, -20, screen.width, screen.height);
    }


    function getLetter(i) {
        if (player.playerY < letter[i].letterY + letterSize / 2 &&
            player.left() < letter[i].letterX + letterSize / 2 &&
            player.right() > letter[i].letterX) {

            playerLetters.push(letter[i].letter)
            //playerLetters.push(letter[i].letter)

            letter[i].letterY = -20;
            letter[i].letterX = Math.round(Math.random() * (screenWidth - 20));
            letter[i].letter = letter[i].chooseLetter();
            wrongLetter();
        }
    }


    function writeCorrectLetter(secret, i) {
        let spacing = screenWidth / 30;
        secret.forEach((element,index) => {
            if(element === playerLetters[i]) {
                writeText(element, screenWidth / 40, 'white', screenWidth / 1.365 + spacing * index, 1.65*screenHeight / 7 + 20);   
            }
        })
    }


    function wrongLetter() {
        for (let i = 0; i < playerLetters.length; i += 1) {
            if (secretWord.word.split("").includes(playerLetters[i]) === false) {
                wrong += 1;
                playerLetters.pop();
                return;
            }
        }

    }


    function hints(hint, positionY) {
        writeText(hint, screenWidth / 35, 'white', screenWidth - screenWidth / 3.7, positionY)
    }


    function stop() {
        clearInterval(intervalUpdateGame);
        player.playerX = 8000;
        player.playerY = 8000;
        letter.forEach(element => {
            element.letterX = 8000;
            element.letterY = -8000;
        })
        startedGame = false;
    }


    function gameWon() {
        let secret = [...new Set(secretWord.word)];
        let secretPlayer = [...new Set(playerLetters)];

        if(secretPlayer.length !== secret.length) {
            return;
        } else {
            writeText(`BRILHANTE!`, screenWidth / 15, 'green', screenWidth / 2 - screenWidth / 2.75, screenHeight / 2 + 20);
        }

    }


    function gameOver() {
        if (wrong === 3) {
            stop();
            writeText('GAME OVER', screenWidth / 15, 'red', screenWidth / 2 - screenWidth / 2.75, screenHeight / 2 + 20);
        }

        writeText(`CHARADA`, screenWidth / 35, 'white', screenWidth - screenWidth / 4.5, 0.7*screenHeight / 7 + 20);
        writeText(`ERROS: ${wrong}`, screenWidth / 35, 'white', screenWidth - screenWidth / 3.7, 6.3*screenHeight / 7 + 20);
    }
    //============================================================================

    function updateGame() {

        if (startedScreen) {
            clearScreen();
            drawLines();
            player.movePlayer();
            player.updatePlayer();
            gameWon();
            gameOver();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'white';
            ctx.strokeRect(-20, -20, (screenWidth * 0.68) + screenWidth * 0.028, screenHeight + 40);
            
            switch(wrong) {
                case 0 :
                    hints(secretWord.hint1, 2.7*screenHeight / 7 + 20);
                    break;
                case 1:
                    hints(secretWord.hint1, 2.7*screenHeight / 7 + 20);
                    hints(secretWord.hint2, 3.4*screenHeight / 7 + 20);
                    break;
                case 2:
                    hints(secretWord.hint1, 2.7*screenHeight / 7 + 20);
                    hints(secretWord.hint2, 3.4*screenHeight / 7 + 20);
                    hints(secretWord.hint3, 4.1*screenHeight / 7 + 20);
                    break;
            }
        }

        if (startedGame) {
            for(let i = 0; i < playerLetters.length; i += 1) {
                writeCorrectLetter(secretWord.word.split(''), i);
            }

            for (let i = 0; i < numOfCreatedLetters; i += 1) {
                if(startedGame === false){
                    break;
                }
               setTimeout(() => {
                        letter[i].drawAndMoveLetter();
                }, i*500);
                getLetter(i);
            }
        }
    }
    //============================================================================
}
