let player = {
    x : 12,
    y : 7,
    score : 0,
    energy : 40,
    highScore : 0
};

/**
 * Une fonction pour accéder à l'objet du joueur
 * @returns Retourne l'objet du joueur
 */
export let getPlayer = () => player;

export function resetPlayer() {
    player.x = 12;
    player.y = 7;
    player.score = 0;
    player.energy = 40;
}