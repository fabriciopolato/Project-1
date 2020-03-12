//window.onload is used to assure that all the code inside it will start to run after the page is entirely loaded
window.onload = () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let screenHeight = document.getElementById('canvas').clientHeight;
    let screenWidth = document.getElementById("canvas").clientWidth;

    let intervalClearScreen = 0;
    let intervalStartScreen = 0;
    let intervalUpdateGame = 0;

    //========================================================================
    //EVENT LISTENERS
    document.getElementById('btn-start').onclick = () => {
        initiate();
        startedInitiate = false;
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
            if (this.updatePosition.right && this.playerX < screenWidth * 0.65) {
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
        constructor(speedLetter = 1) {
            //Math.round(Math.random() * (canvas.width - 20)) -- it selects a random X between 0 and canvas.width minus 20px (margin), so it can fit on the screen without passing it
            this.letterX = Math.round(Math.random() * (screenWidth * 0.65) + screenWidth * 0.02);
            this.letterY = -20;
            this.arrayLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z'];
            this.speedLetter = speedLetter;
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
                this.letterX = Math.round(Math.random() * (screenWidth * 0.65) + screenWidth * 0.02);
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
            hint1: '1) Fruta',
            hint2: '2) Azeda',
            hint3: '3) Coroa'
        },
        {
            word: 'BALEIA',
            hint1: '1) Animal',
            hint2: '2) Grande',
            hint3: '3) Mar'
        },
        {
            word: 'CEREBRO',
            hint1: '1) Orgão',
            hint2: '2) Muito usado',
            hint3: '3) Pense mais'
        },
        {
            word: 'BALEIA',
            hint1: '1) Cidade',
            hint2: '2) América do Sul',
            hint3: '3) Chile'
        },
        {
            word: 'CORONA',
            hint1: '1) Cerveja',
            hint2: '2) Vírus',
            hint3: '3) Epidemia'
        },
        

        
        
    ];

    //============================================================================



    let letter = [];
    let player = new Player(100);
    let count = 3;
    let startedGame = false;
    let startedScreen = false;
    let startedInitiate = true;
    let numOfCreatedLetters = 20;
    let playerLetters = [];
    let wrong = 0;
    let secretWord = chooseSecretWord();

//instantiate new Letter based on numOfCreatedLetters
    for (let i = 0; i < numOfCreatedLetters; i += 1) {
        if(numOfCreatedLetters <= 10) {
            letter[i] = new Letter(i*1.5 + 0.5);
        } else if (numOfCreatedLetters > 10 && numOfCreatedLetters <= 20) {
            letter[i] = new Letter(i/2);
        } else {
            letter[i] = new Letter(i/3);
        }
    }

//function called by pressing the PLAY button, it initiates the game
    function initiate() {
        if(startedInitiate) {
        intervalClearScreen = setInterval(clearScreen, 500)
        intervalStartScreen = setInterval(startScreen, 1000)
        intervalUpdateGame = setInterval(updateGame, 20)
        }
    }

//function to write texts on the element Canvas
    function writeText(text, fontSize, color, positionX, positionY, fontfamily = 'Arial') {
        ctx.fillStyle = color;
        ctx.font = fontSize + 'px ' + fontfamily;
        ctx.fillText(text, positionX, positionY);
    }

//function to call the texts on the Start Screen
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
    
//function to choose a Secret Word for the charade
    function chooseSecretWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

//function to draw the lines on Canvas based on the number of words of the Secret Word
    function drawLines() {
        let underline = screenWidth / 40;
        let spacing = screenWidth / 30;
    
        for(let i = 0; i < secretWord.word.length; i += 1){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(screenWidth - screenWidth / 3.7 + spacing * i, 2*screenHeight / 7 + 20);
            ctx.lineTo(screenWidth - screenWidth / 3.7 + underline + spacing*i, 2*screenHeight / 7 + 20);
            ctx.stroke();
        }
    }
   
//function to start the game after Start Screen is played
    function startGame() {
        player.drawPlayer();
        startedGame = true;
    }

//function called by the RESTART button, it is used to start the game again without passing through the Start Screen
    function restartGame() {
        if(startedScreen) {
            stop();
            clearScreen();
            //set the variables to the initial values
            letter = [];
            count = 3;
            wrong = 0;
            startedGame = true;
            startedScreen = true;
            startedInitiate = true;
            playerLetters = [];
            secretWord = chooseSecretWord();
            player.playerX = 100;
            player.playerY = screenHeight - player.playerHeight;

            for (let i = 0; i < numOfCreatedLetters; i += 1) {
                letter[i] = new Letter(i);
            }

            intervalUpdateGame = setInterval(updateGame, 20)
            startGame();

            for(let i = 0; i < numOfCreatedLetters; i += 1) {
                letter[i].letterY = -20;
                letter[i].letterX = Math.round(Math.random() * (screenWidth * 0.65) + screenWidth * 0.02);
                letter[i].letter = letter[i].chooseLetter();
            }
        }
    }

//function to clear the Canvas
    function clearScreen() {
        ctx.clearRect(-20, -20, screen.width, screen.height);
    }

//function to determine how the player colides with a letter
    function getLetter(i) {
        if (player.playerY < letter[i].letterY + letterSize / 2 &&
            player.left() < letter[i].letterX + letterSize / 2 &&
            player.right() > letter[i].letterX) {

            playerLetters.push(letter[i].letter)

            letter[i].letterY = -20;
            letter[i].letterX = Math.round(Math.random() * (screenWidth * 0.65) + screenWidth * 0.02);
            letter[i].letter = letter[i].chooseLetter();
            wrongLetter();
        }
    }

//function to write all the correct letters that the player caught during one game on Canvas
    function writeCorrectLetter(secret, i) {
        let spacing = screenWidth / 30;
        secret.forEach((element,index) => {
            if(element === playerLetters[i]) {
                writeText(element, screenWidth / 40, 'white', screenWidth / 1.36 + spacing * index, 1.89*screenHeight / 7 + 20);   
            }
        })
    }

//function to remove the wrong letters from the player's array of caught letters, it also increments the variable 'WRONG' by one for each wrong letter caught by the player
    function wrongLetter() {
        for (let i = 0; i < playerLetters.length; i += 1) {
            if (secretWord.word.split("").includes(playerLetters[i]) === false) {
                wrong += 1;
                playerLetters.pop();
                return;
            }
        }

    }

//function to write the hints on Canvas
    function hints(hint, positionY) {
        writeText(hint, screenWidth / 35, 'white', screenWidth - screenWidth / 3.7, positionY)
    }

//function to stop the game
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

//function to decide when the player wins the game
    function gameWon() {
        let secret = [...new Set(secretWord.word)];
        let secretPlayer = [...new Set(playerLetters)];

        if(secretPlayer.length !== secret.length) {
            return;
        } else {
            stop();
            writeText(`BRILHANTE!`, screenWidth / 15, 'green', screenWidth / 2 - screenWidth / 2.75, screenHeight / 2 + 20);
        }

        for(let i = 0; i < playerLetters.length; i += 1) {
            writeCorrectLetter(secretWord.word.split(''), i);
        }

    }

//function to decide when the player loses the game
    function gameOver() {
        if (wrong === 3) {
            stop();
            writeText('GAME OVER', screenWidth / 15, 'red', screenWidth / 2 - screenWidth / 2.75, screenHeight / 2 + 20);
        }

        for(let i = 0; i < playerLetters.length; i += 1) {
            writeCorrectLetter(secretWord.word.split(''), i);
        }
        writeText(`CHARADA`, screenWidth / 35, 'white', screenWidth - screenWidth / 4.5, 0.7*screenHeight / 7 + 20);
        writeText(`ERROS: ${wrong}`, screenWidth / 35, 'white', screenWidth - screenWidth / 3.7, 6.3*screenHeight / 7 + 20);
    }
    
    //============================================================================
//function to keep the game running and updating, it's called by the PLAY and RESTART buttons
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
                    hints(secretWord.hint1, 3*screenHeight / 7 + 20);
                    break;
                case 1:
                    hints(secretWord.hint1, 3*screenHeight / 7 + 20);
                    hints(secretWord.hint2, 3.7*screenHeight / 7 + 20);
                    break;
                case 2:
                    hints(secretWord.hint1, 3*screenHeight / 7 + 20);
                    hints(secretWord.hint2, 3.7*screenHeight / 7 + 20);
                    hints(secretWord.hint3, 4.4*screenHeight / 7 + 20);
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
