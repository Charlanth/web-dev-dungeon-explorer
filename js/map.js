import { getPlayer, updateStats } from "./player.js";
import { gameOver, getGameOver, setGameOver } from "./gameover.js";

// Dimension de la carte
const mapHeight = 15;
const mapWidth = 25;

// Objet html de la carte
const mapGrid = document.getElementById("map-table");

// Carte du jeu
let map = [];

// Valeurs pour la carte du jeu
const tile_values = {
    trap : 0,
    treasure : 1,
    wall : 2,
    empty : 3,
    player : 4
};

/**
 * Fonction pour obtenir les données de la carte du jeu
 * @returns La carte du jeu
 */
export let getTileMap = () => map;

/**
 * Efface les données de la carte du jeu
 * @returns
 */
export let eraseMap = () => map = [];

/**
 * Fonction pour obtenir l'objet html de la carte du jeu
 * @returns L'objet html de la carte
 */
export let getMapGrid = () => mapGrid;

/**
 * Génère la carte du donjon pour le jeu et assigne les images pour la carte
 */
export function generateMap() {
    for (let y = 0; y < mapHeight; y++) {
        map.push([]);
        let mapRow = document.createElement("div");
        for (let x = 0; x < mapWidth; x++) {
            const random = Math.random();

            // Insère les tuiles dans la carte du jeu
            map[y].push(random < 0.1 ? tile_values.wall : random > 0.9 ? tile_values.treasure : tile_values.trap);

            let tileContainer = document.createElement("div");
            let tile = document.createElement("img");

            // Trouve l'image a afficher pour la tuile
            tile.src = map[y][x] === tile_values.trap ? "/assets/tiles/trap.png" :
                    map[y][x] === tile_values.treasure ? "/assets/tiles/treasure.png" :
                    map[y][x] === tile_values.wall ? "/assets/tiles/wall.png" :
                    "/assets/tiles/empty.png";
            tile.id = `tile-${y}-${x}`

            tileContainer.appendChild(tile).className = "tile-img";
            mapRow.appendChild(tileContainer).className = "tile";
        }
        mapGrid.appendChild(mapRow).className = "map-row";
    }
}

/**
 * Gère le déplacement du joueur, le score du joueur et l'énergie du joueur lors
 * d'un déplacement du joueur
 * @param {number} deltaX Changement de la position x du joueur
 * @param {number} deltaY Changement de la position y du joueur
 * @returns Retourne rien
 */
export function movePlayer(deltaX, deltaY) {
    let player = getPlayer();

    // S'assure qu'il reste de l'énergie au joueur sinon préviens le joueur de bouger
    if (player.energy <= 0 || getGameOver()){
        setGameOver(true);
        gameOver();
        return;
    }
    
    // Nouvelle position du joueur
    let newX = player.x + deltaX, newY = player.y + deltaY;

    // S'assure que le joueur ne sort pas des limites et ne marche pas dans les murs
    if (newY >= mapHeight || newX >= mapWidth || newY < 0 || newX < 0 ||
        map[newY][newX] === tile_values.wall) 
        return;

    // Trouve la tuile que le joueur a marcher dessus
    const tile = map[newY][newX];

    // Applique les effets des tuiles au joueur
    if (tile === tile_values.trap) {
        player.energy--;
        player.score -= 50;
    }
    else if (tile === tile_values.treasure) {
        player.score += 1000;
    }
    else {
        player.score -= 10;
    }
    
    // Met à jour les informations du jeu, les tuiles, les coordonnées du joueur et les statistiques
    updateMapTile(player.x, player.y);
    [player.x, player.y] = [newX, newY];
    updateMapTile(getPlayer().x, getPlayer().y, "/assets/tiles/player.png", tile_values.player);
    updateStats();

    // Affiche le pop up de gameover si l'énergie du joueur atteind 0 ou moins
    if (player.energy <= 0) {
        setGameOver(true);
        gameOver();
    }
}

/**
 * Met à jour les donnés d'une tuie et l'image de la tuile
 * @param {number} tileValue la valeur à le et sa valeur selon les paramètres
 * @param {number} x le x de la tuile à mettre à jour
 * @param {number} y le y de la tuile à mettre à jour
 * @param {string} tilePath le chemin ddonner à la tuile
 */
export function updateMapTile(x, y, tilePath = "/assets/tiles/empty.png", tileValue = tile_values.empty) {
    const tileToUpdate = document.getElementById(`tile-${y}-${x}`);
    tileToUpdate.src = tilePath;
    map[y][x] = tileValue;
}