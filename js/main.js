import { movePlayer } from "./map.js";
import { startNewGame, gameOver } from "./gameover.js";

// Les boutons pour controller le joueur
const buttonUp = document.getElementById("button-up");
const buttonDown = document.getElementById("button-down");
const buttonLeft = document.getElementById("button-left");
const buttonRight = document.getElementById("button-right");

// Les boutons pour quitter le donjons et démarré une nouvelle partie
const buttonFinish = document.getElementById("button-finish-game");
const buttonNewGame = document.getElementById("new-game");

// Gère la saisie du joueur avec le clavier
document.addEventListener("keydown", function(event) {
    if (event.key === "w") {
        movePlayer(0, -1);
    }
    if (event.key === "s") {
        movePlayer(0, 1);
    }
    if (event.key === "d") {
        movePlayer(1, 0);
    }
    if (event.key === "a") {
        movePlayer(-1, 0);
    }
});

// Initialise une nouvelle partie
startNewGame()

// Initialise les eventListeners pour les boutons de mouvement du joueur
buttonUp.addEventListener("click", () => movePlayer(0, -1));
buttonDown.addEventListener("click", () => movePlayer(0, 1));
buttonLeft.addEventListener("click", () => movePlayer(-1, 0));
buttonRight.addEventListener("click", () => movePlayer(1, 0));

// Initialise les eventListeners pour les boutons de gameover et new game
buttonFinish.addEventListener("click", gameOver);
buttonNewGame.addEventListener("click", startNewGame);