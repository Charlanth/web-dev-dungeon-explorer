import { movePlayer } from "./map.js";
import { startNewGame, gameOver } from "./gameover.js";

// The buttons for the player movement
const buttonUp = document.getElementById("button-up");
const buttonDown = document.getElementById("button-down");
const buttonLeft = document.getElementById("button-left");
const buttonRight = document.getElementById("button-right");

// The buttons for the game over and new game
const buttonFinish = document.getElementById("button-finish-game");
const buttonNewGame = document.getElementById("new-game");

// Manages the keyboard events for the player movement
document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key === "ArrowUp") {
        movePlayer(0, -1);
    }
    if (event.key === "s" || event.key === "ArrowDown") {
        movePlayer(0, 1);
    }
    if (event.key === "d" || event.key === "ArrowRight") {
        movePlayer(1, 0);
    }
    if (event.key === "a" || event.key === "ArrowLeft") {
        movePlayer(-1, 0);
    }
});

// Initialises the game
startNewGame()

// Initialises the eventListeners for the player movement buttons
buttonUp.addEventListener("click", () => movePlayer(0, -1));
buttonDown.addEventListener("click", () => movePlayer(0, 1));
buttonLeft.addEventListener("click", () => movePlayer(-1, 0));
buttonRight.addEventListener("click", () => movePlayer(1, 0));

// Initialises the eventListeners for the game over and new game buttons
buttonFinish.addEventListener("click", gameOver);
buttonNewGame.addEventListener("click", startNewGame);