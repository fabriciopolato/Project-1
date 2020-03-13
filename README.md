# CHARADA
Project 1 - Ironhack Game

## AKNOWLEDGEMENTS
I would like to thank IronHack Brazil for all support along the course that was fundamental for the conclusion of this project.

## THE PROJECT
This project was part of the Web Development Bootcamp at IronHack Brazil. This is the first of three projects that are mandatory to graduate at the course.
All the used knowledge in this project was adquired during 2 weeks of bootcamp. Since we didn't have too much time to finish it, the game presents some minor bugs that need to be fixed yet. I hope I  will be working on it as soon as I get more free time.

## THE GAME
Charada is a portuguese word for charade. The main goal of this game is to find out the secret word on the right side of the screen, letter by letter. You win the game when you find out all the right letter of the secret words and you lose it when you get 3 wrong letters. This game reassembles the Hangman game.
You can start the game by pressing the PLAY button. After you have done it once, use the RESTART button to play again. You can select the difficulty of the game at any time. If you don't do it, don't worry, the game will select the EASY difficulty as standard.

### INSTRUCTIONS
1. Use the arrow keys to move the dictionary. It can only move to the left and right sides.
1. When you start the game, letters start to fall out. At the right side of the screen, white dashes show the number of letter of the secret words.
1. A first hint appears below the dashes, so you can start to guess the letters.
1. While the letters are falling, you need to try to collect all the letters you think are in the secret word in order to win.
1. If you get a wrong letter, you commit one error.
1. At each error, a new hint is released, so you can guess more accurately.
1. Be aware, at the end of three errors, you lose the game.

## DEVELOPING
* This game was entirely drawn using *Canvas*. 
* Some knowledge in *DOM manipulation* were also used to activate the buttons.
* All the game was coded using *HTML5, CSS, Bootstrap* and *JavaScript*.
* Also, in order to the game performs as intended, I worked with colisions and intervals.


## FURTHER INFORMATION
The game presents some minor bugs that I intend to fix when I have some free time.
Below, there are some bugs I noted so far:

- [ ] After you press PLAY, the first sentence on the screen is **ARE YOU READY?** and if you pay attention, you will see that the first time the sentence appears it blinks in a different font letter. 
- [ ] First time you play the game, it can start really fast regardless the difficulty. When you reload the page, it starts to work normally.
- [ ] First time the player appears, it blinks on the screen.

## PLAY
You can play the game by clicking [HERE](https://fapolato.github.io/fapolato/)

## CONTRIBUTING
This is a free software, feel free to contribute in any way you want
1. Fork it (https://github.com/fapolato/fapolato/fork)
1. Create your feature branch (git commit -am 'Add some fooBar')
1. Commit you changes (git push origin feature/fooBar)
1. Create a new Pull Request
