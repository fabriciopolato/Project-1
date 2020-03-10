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
        intervalStartScreen = setInterval(startScreen,1000)
        intervalUpdateGame = setInterval(updateGame, 20)

    };
    document.getElementById('btn-restart').onclick = () => {
        restartGame();
    }
    window.addEventListener('resize', function(){
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
    window.addEventListener('keydown', function(event){
        let randomNum = Math.floor(Math.random() * 99);
        let randomNum2 = Math.floor(Math.random() * 99);
        let randomNum3 = Math.floor(Math.random() * 99);
        document.querySelector('body').style.backgroundColor = `#${randomNum}${randomNum2}${randomNum3}`;
    })
    //============================================================================
    
    class Player {
        constructor(playerX) {
            this.playerWidth = 40;
            this.playerHeight = 40;
            this.playerX = playerX;
            this.playerY = screenHeight - this.playerHeight;
            this.playerRight = playerX + this.playerWidth;
            this.playerBottom = this.playerY + this.playerHeight;
            this.updatePosition = {left: false, rigth: false};
            document.addEventListener('keydown', (event) => this.keyDownEvent(event.keyCode));
            document.addEventListener('keyup', (event) => this.keyUpEvent(event.keyCode));
        }

        drawPlayer() {
            ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
        }

        updatePlayer() {
            ctx.strokeStyle = `red`;
            ctx.strokeRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
        }

        keyUpEvent(keyCode) {
            switch(keyCode) {
                case 37:
                    console.log('left')
                    this.updatePosition.left = false;
                break;
                case 39:
                    this.updatePosition.rigth = false;
                break;
            }
        }

        keyDownEvent(keyCode) {
            console.log(keyCode)
            switch(keyCode) {
                case 37:
                    this.updatePosition.left = true;
                    console.log(this.updatePlayer.left)
                break;
                case 39:
                    this.updatePosition.rigth = true;
                break;
            }
        }

        movePlayer() {
            console.log('movePlayer')
            // console.log(this.updatePlayer.right)
            if(this.updatePlayer.left) {
                this.playerX -= 5;
                console.log('-x')
            }
            if(this.updatePlayer.rigth) {
                this.playerX += 5;
                console.log('+x')
            }
        }
    }

    class Letter {
        constructor() {
            this.width = canvas.width/50;
            this.height = 30;
            this.arrayLetters = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','X','Z'];
        }

        chooseLetter() {
            let randomIndex = Math.floor(Math.random() * this.arrayLetters.length);
            return this.arrayLetters[randomIndex];
        }

        callLetterOnScreen() {
            ctx.fillStyle = "white";
            ctx.font = screenWidth/35 + 'px Arial'
            let letter = this.chooseLetter();
            //Math.round(Math.random() * (canvas.width - 20)) -- it selects a random X between 0 and canvas.width minus 20px, so it can fit on the screen without passing it
            ctx.fillText(letter, Math.round(Math.random() * (canvas.width - 20)), screenWidth/35);
        }

        // moveLetter() {

        // }
    }
    
//ARRAY OF WORDS (OBJECTS)
    let words = [
    {
        word: 'ABACAXI',
        length: 7,
        hint1: 'É uma fruta',
        hint2: 'É azeda' 
    },
    {
        word:'BALEIA',
        length: 6,
        hint1: 'É um animal',
        hint2: 'Mora no mar',
    }
];

// let hint3 = `Tem ${words[0].length} letras`;


//============================================================================

    let letter = new Letter();
    let player = new Player(50);
    let count = 3;

    function startScreen() {
        clearScreen();
        ctx.fillStyle = "white";
        ctx.font = screenWidth/10 + 'px Arial';
        ctx.fillText('ARE YOU READY?',screenWidth/2 - screenWidth/2.3, screenHeight/2 + 20);

        if(count === 0) {
            clearInterval(intervalClearScreen);
            clearInterval(intervalStartScreen)
            clearScreen();
            ctx.fillText('GO!',screenWidth/2 - screenWidth/20, screenHeight/2 + 20);
            setTimeout(clearScreen, 1000);
            setTimeout(startGame, 1000);
        }
        return count--;
    }
//============================================================================

    function startGame() {
        console.log('START - jogo começou');
        player.drawPlayer();
        letter.callLetterOnScreen();
        return true;
    }

    function restartGame() {
         console.log('RESTART - jogo restartou');

    }

    function clearScreen() {
        ctx.clearRect(0, 0, screen.width, screen.height);
    }
//============================================================================

    function updateGame() {
            player.movePlayer();
            player.updatePlayer();
        // // startGame();
        // clearScreen();
        // player.movePlayer()
    }
//============================================================================

}
