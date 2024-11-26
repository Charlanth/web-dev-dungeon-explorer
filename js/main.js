import { GenerateMap, FillMapGrid, UpdateMapGridAndInfo, MovePlayer } from "./map.js";

// Les bouttons pour controller le joueur
const buttonUp = document.getElementById("button-up");
const buttonDown = document.getElementById("button-down");
const buttonLeft = document.getElementById("button-left");
const buttonRight = document.getElementById("button-right");

document.addEventListener("keydown", function(event) {
    if (event.key === "w") {
        MovePlayer(0, 1);
    }
    if (event.key === "s") {
        MovePlayer(0, -1);
    }
    if (event.key === "d") {
        MovePlayer(1, 0);
    }
    if (event.key === "a") {
        MovePlayer(-1, 0);
    }
});

GenerateMap()
FillMapGrid()
UpdateMapGridAndInfo()

buttonUp.addEventListener("click", () => MovePlayer(0, 1));
buttonDown.addEventListener("click", () => MovePlayer(0, -1));
buttonLeft.addEventListener("click", () => MovePlayer(-1, 0));
buttonRight.addEventListener("click", () => MovePlayer(1, 0));