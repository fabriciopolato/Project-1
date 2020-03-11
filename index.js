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

        console.log(`
        ============================
        screenWidth: ${screenWidth}
        canvas.width: ${canvas.width}
        screenHeight: ${screenHeight}
        canvas.height: ${canvas.height}
        ============================
        `);

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
            console.log(this.updatePosition)
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
            if (this.updatePosition.right && this.playerX < screenWidth * 0.96) {
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
            this.letterX = Math.round(Math.random() * (screenWidth - 20));
            this.letterY = -20;
            this.arrayLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z'];
            this.speedLetter = 5;
            this.letter = this.chooseLetter();
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
                this.letterX = Math.round(Math.random() * (screenWidth * 0.94) + screenWidth * 0.03);
                this.letter = this.chooseLetter();
            }
            console.log('draw')
            ctx.fillStyle = "white";
            ctx.font = letterSize + 'px Arial'
            ctx.fillText(this.letter, this.letterX, this.letterY);
        }
    }

    //============================================================================
    //ARRAY OF WORDS (OBJECTS)
    let words = [
        {
            word: 'ABACAXI',
            length: 7,
            hint1: 'É uma fruta',
            hint2: 'É azeda'
        },
        {
            word: 'BALEIA',
            length: 6,
            hint1: 'É um animal',
            hint2: 'Mora no mar',
        }
    ];
    // let hint3 = `Tem ${words[0].length} letras`;

    //============================================================================

    let letter = [];
    let player = new Player(100);
    let count = 3;
    let startedGame = false;
    let startedScreen = false;
    let numOfCreatedLetters = 2;
    let playerLetters = [];
    let wrong = 0;
    
    for (let i = 0; i < numOfCreatedLetters; i += 1) {
        letter[i] = new Letter();
    }
    
    function startScreen() {
        clearScreen();
        ctx.fillStyle = "white";
        ctx.font = screenWidth / 10 + 'px Arial';
        ctx.fillText('ARE YOU READY?', screenWidth / 2 - screenWidth / 2.3, screenHeight / 2 + 20);
        
        if (count === 2) {
            clearInterval(intervalClearScreen);
            clearInterval(intervalStartScreen)
            clearScreen();
            // ctx.fillText('GO!',screenWidth/2 - screenWidth/20, screenHeight/2 + 20);
            setTimeout(clearScreen, 1000);
            setTimeout(startGame, 1000);
            startedScreen = true;
        }
        return count--;
    }
    
    function chooseSecretWord() {
        return words[Math.floor(Math.random() * words.length)];
    }
    
   
    function startGame() {
        console.log('START - jogo começou');
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
        console.log('RESTART - jogo restartou');
    }

    function clearScreen() {
        ctx.clearRect(-20, -20, screen.width, screen.height);
    }

    function getLetter(i) {
        if (player.playerY < letter[i].letterY + letterSize / 2 &&
            player.left() < letter[i].letterX + letterSize / 2 &&
            player.right() > letter[i].letterX) {

            playerLetters.push(letter[i].letter)
            letter[i].letterY = -20;
            letter[i].letterX = Math.round(Math.random() * (screenWidth - 20));
            letter[i].letter = letter[i].chooseLetter();
            wrongLetter();
            console.log(`
                ==================
                GET LETTER = ${wrong}
                VALOR I = ${i}
                LENGTH PLAYER = ${playerLetters.length}
                PLAYER = ${playerLetters}
                `)
        }
    }

    function wrongLetter() {
        for (let i = 0; i < playerLetters.length; i = + 1) {
            if (playerLetters[i] !== secretWord.word[i]) {
                wrong += 1;
                console.log(`
                ==================
                WRONG LETTER = ${wrong}
                VALOR I = ${i}
                LENGTH PLAYER = ${playerLetters.length}
                PLAYER = ${playerLetters}
                `)
                popLetter();
                return;
            }
        }
    }

    function popLetter() {
        console.log(playerLetters)
        playerLetters.pop();
        console.log(playerLetters)
    }

    function stop() {
        clearInterval(intervalUpdateGame);
        player.playerX = 8000;
        player.playerY = 8000;
        letter.forEach(element => {
            element.letterX = 8000;
            element.letterY = -8000;
        })
    }

    function gameOver() {
        if (wrong === 10) {
            stop();
            ctx.font = screenWidth / 10 + 'px Arial';
            ctx.fillText('GAME OVER', screenWidth / 2 - screenWidth / 3.5, screenHeight / 2 + 20)
        }
    }

    //============================================================================
    secretWord = chooseSecretWord();
    console.log(secretWord)
    

    function updateGame() {
        if (startedScreen) {
            clearScreen();
            player.movePlayer();
            player.updatePlayer();
            gameOver();
        }

        if (startedGame) {
            for (let i = 0; i < numOfCreatedLetters; i += 1) {
               setTimeout(() => {
                        letter[i].drawAndMoveLetter();
                }, i*500);
                getLetter(i);
            }
        }
    }
    //============================================================================

}
