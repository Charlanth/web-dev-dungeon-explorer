// L'objet contenant les données du joueur
let player = {
    x : 12,
    y : 7,
    score : 0,
    energy : 40,

    // Récupère le highscore du navigateur s'il existe
    highScore : localStorage.getItem("highscore") ? localStorage.getItem("highscore") : 0
};

// Les objets html pour les stats
const energyText = document.getElementById("player-energy")
const energyBar = document.getElementById("energy-bar")
const scoreText = document.getElementById("player-score")

/**
 * Une fonction pour accéder à l'objet du joueur
 * @returns Retourne l'objet du joueur
 */
export let getPlayer = () => player;

/**
 * Met à jour le visuel des statistique du joueur
 */
export function updateStats() {
    energyText.innerText = `${player.energy}`;
    energyBar.style.setProperty("width", (player.energy/40) * 50 + "%")
    energyBar.style.setProperty("background-color", player.energy <= 10 ? "#e00" : player.energy <= 25 ? "#eaff00" : "#44ff00")
    scoreText.innerText = `${player.score}`;
}

/**
 * Remet les valeurs du joueur au valeurs par défaut sauf le highscore
 */
export function resetPlayer() {
    player.x = 12;
    player.y = 7;
    player.score = 0;
    player.energy = 40;
}