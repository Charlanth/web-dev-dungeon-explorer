import { getPlayer, resetPlayer, updateStats } from "./player.js";
import { eraseMap, generateMap, getMapGrid, updateMapTile } from "./map.js";

let isGameOver = true;

// The elements for the game over pop up
const gameOverPopUp = document.getElementById("game-over");
const finalScoreText = document.getElementById("final-score");
const highScoreText = document.getElementById("highscore");

/**
 * Allows to change the value of isGameOver
 * @param {boolean} gameStatus 
 */
export function setGameOver(gameStatus) {
    isGameOver = gameStatus;
}

/**
 * Returns the value of isGameOver
 * @returns {boolean}
 */
export let getGameOver = () => isGameOver;

/**
 * Ends the game and shows the game over pop up
 * @returns {void}
 */
export function gameOver() {
    if(!gameOverPopUp.classList.contains("hide")) return;
    let player = getPlayer();

    // Updates player highscore if the score is higher than the previous one
    player.highScore = player.score > player.highScore ? player.score : player.highScore;

    // Saves the highscore in local storage
    localStorage.setItem("highscore", player.highScore)

    // Updates the score and highscore text in the pop up
    finalScoreText.innerText = `${player.score}`;
    highScoreText.innerText = `${player.highScore}`;

    isGameOver = true;

    // Shows the game over pop up
    gameOverPopUp.classList.toggle("hide");
}

/**
 * Resets the game and starts a new one
 * @returns {void}
 */
export function startNewGame() {
    if(!getGameOver()) return;
    resetPlayer();
    eraseMap();
    getMapGrid().innerHTML = "";
    generateMap();
    updateMapTile(12, 7, "/assets/tiles/player.png", 4);
    updateStats();
    isGameOver = false;
    gameOverPopUp.classList.toggle("hide");
}