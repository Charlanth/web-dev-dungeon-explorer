// Player object
let player = {
    x : 12,
    y : 7,
    score : 0,
    energy : 40,

    // Gets the highscore from local storage or sets it to 0 if it doesn't exist
    highScore : localStorage.getItem("highscore") ? localStorage.getItem("highscore") : 0
};

// The elements for the player stats
const energyText = document.getElementById("player-energy")
const energyBar = document.getElementById("energy-bar")
const scoreText = document.getElementById("player-score")

/**
 * Gets the player object
 * @returns {object} The player object
 */
export let getPlayer = () => player;

/**
 * Updates the player stats in the UI
 * @returns {void}
 */
export function updateStats() {
    energyText.innerText = `${player.energy}`;
    energyBar.style.setProperty("width", (player.energy/40) * 50 + "%")
    energyBar.style.setProperty("background-color", player.energy <= 10 ? "#e00" : player.energy <= 25 ? "#eaff00" : "#44ff00")
    scoreText.innerText = `${player.score}`;
}

/**
 * Resets the player stats to the initial values
 * @returns {void}
 */
export function resetPlayer() {
    player.x = 12;
    player.y = 7;
    player.score = 0;
    player.energy = 40;
}