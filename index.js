window.onload = () => {
    console.log('funcionando')
    let intervalClearScreen = 0;
    let intervalStartScreen = 0;
    document.getElementById('btn-start').onclick = () => {
        intervalClearScreen = setInterval(clearScreen, 500)
        intervalStartScreen = setInterval(startScreen,1000)

    };
    document.getElementById('btn-restart').onclick = () => {
        restartGame();
    }
    window.addEventListener('resize', function(){
        screenWidth = document.getElementById("canvas").clientWidth
        console.log(`
        ============================
        screenWidth: ${screenWidth}
        canvas.width: ${canvas.width}
        ============================
        `);
    })
    window.addEventListener('keydown', function(){
        let randomNum = Math.floor(Math.random() * 99);
        let randomNum2 = Math.floor(Math.random() * 99);
        let randomNum3 = Math.floor(Math.random() * 99);
        document.querySelector('body').style.backgroundColor = `#${randomNum}${randomNum2}${randomNum3}`;
    })

    //CANVAS
    let screenHeight = document.getElementById('canvas').clientHeight;
    let screenWidth = document.getElementById("canvas").clientWidth;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

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
            ctx.font = '10px Arial'
            let letter = this.chooseLetter();
            //Math.round(Math.random() * (canvas.width - 20)) -- it selects a random X between 0 and canvas.width minus 20px, so it can fit on the screen without passing it
            ctx.fillText(letter, Math.round(Math.random() * (canvas.width - 20)), 40, 50);
        }


    }

    //JAVASCRIPT
    let letter = new Letter();
    let count = 3;

    function startScreen() {
        clearScreen();
        ctx.fillStyle = "white";
        ctx.font = '15px Arial';
        ctx.fillText('ARE YOU READY?',screenWidth/11, 80);

        if(count === -10) {
            clearInterval(intervalClearScreen);
            clearInterval(intervalStartScreen)
            clearScreen();
            startGame();
        }
        return count--;
    }

    function startGame() {
        console.log('START - jogo começou');
        letter.callLetterOnScreen();
    }

    function restartGame() {
         console.log('RESTART - jogo restartou');

    }

    function clearScreen() {
        ctx.clearRect(0, 0, 1000, 1000);
    }


    function updateGame() {
        // startGame();
        // clearScreen();
    }



     
     
}