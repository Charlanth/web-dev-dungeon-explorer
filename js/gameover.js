import { getPlayer } from "./player";

let isGameOver = true;

export function setGameOver(gameStatus) {
    gameOver = gameStatus;
}

export let getGameOver = () => isGameOver;

export function gameOver() {
    let player = getPlayer()
    player.highScore = player.score > player.highScore ? score : highScore;
}