import { getPlayer, resetPlayer } from "./player.js";
import { eraseMap, generateMap, getMapGrid, updateMapTile, updateStats } from "./map.js";

let isGameOver = true;

// Les objets utiliser pour le pop up de gameover
const gameOverPopUp = document.getElementById("game-over");
const finalScoreText = document.getElementById("final-score");
const highScoreText = document.getElementById("highscore");

/**
 * Permet de changer la valeur de isGameOver
 * @param {boolean} gameStatus 
 */
export function setGameOver(gameStatus) {
    isGameOver = gameStatus;
}

/**
 * Fonction pour obtenir la valeur de isGameOver
 * @returns
 */
export let getGameOver = () => isGameOver;

/**
 * Termine la partie et affiche le pop up de gameover
 * @returns rien
 */
export function gameOver() {
    if(!gameOverPopUp.classList.contains("hide")) return;
    let player = getPlayer();

    // Met à jour le highscore au besoin
    player.highScore = player.score > player.highScore ? player.score : player.highScore;

    // Change le texte du score final et du highscore
    finalScoreText.innerText = `${player.score}`;
    highScoreText.innerText = `${player.highScore}`;

    setGameOver(true);

    // Affiche le pop up de gameover
    gameOverPopUp.classList.toggle("hide");
}

/**
 * Démarre une nouvelle partie et cache le pop up de gameover
 * @returns 
 */
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