import { getPlayer, resetPlayer } from "./player.js";
import { eraseMap, generateMap, getMapGrid, updateMapTile, updateStats } from "./map.js";

let isGameOver = true;

const gameOverPopUp = document.getElementById("game-over");
const finalScoreText = document.getElementById("final-score");
const highScoreText = document.getElementById("highscore");

export function setGameOver(gameStatus) {
    isGameOver = gameStatus;
}

export let getGameOver = () => isGameOver;

export function gameOver() {
    let player = getPlayer();

    // Met à jour le highscore au besoin
    player.highScore = player.score > player.highScore ? player.score : player.highScore;
    finalScoreText.innerText = `${player.score}`;
    highScoreText.innerText = `${player.highScore}`;
    setGameOver(true);
    gameOverPopUp.classList.toggle("hide");
}

export function toggleGameOver() {
    if(!gameOverPopUp.classList.contains("hide")) return;
    gameOver();
}

export function startNewGame() {
    if(!getGameOver()) return;
    resetPlayer();
    eraseMap();
    getMapGrid().innerHTML = "";
    generateMap();
    updateMapTile(12, 7, "/assets/tiles/player.png", 4);
    updateStats();
    setGameOver(false);
    gameOverPopUp.classList.toggle("hide");
}