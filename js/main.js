import { generateMap, updateStats, movePlayer, updateMapTile } from "./map.js";

// Les bouttons pour controller le joueur
const buttonUp = document.getElementById("button-up");
const buttonDown = document.getElementById("button-down");
const buttonLeft = document.getElementById("button-left");
const buttonRight = document.getElementById("button-right");

const gameOverPopUp = document.getElementById("game-over");
const buttonFinish = document.getElementById("button-finish-game");

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

generateMap();
updateMapTile(12, 7, "/assets/tiles/player.png", 4);
updateStats();

buttonUp.addEventListener("click", () => movePlayer(0, -1));
buttonDown.addEventListener("click", () => movePlayer(0, 1));
buttonLeft.addEventListener("click", () => movePlayer(-1, 0));
buttonRight.addEventListener("click", () => movePlayer(1, 0));

buttonFinish.addEventListener("click", () => gameOverPopUp.classList.toggle("hide"));