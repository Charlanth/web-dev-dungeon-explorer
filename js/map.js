import { getPlayer } from "./player.js";
import { gameOver, getGameOver, setGameOver } from "./gameover.js";

const mapHeight = 15;
const mapWidth = 25;

const mapGrid = document.getElementById("map-table");

// Carte du jeu
let map = [];

const tile_values = {

    // Valeurs des tuiles de la carte de déplacement du joueur
    AVAILABLE : "-",
    
    UNAVAILABLE : "x",

    // Valeur pour la carte du jeu
    trap : 0,
    treasure : 1,
    wall : 2,
    empty : 3,
    player : 4
};

export let getTileMap = () => map;
export let eraseMap = () => map = [];
export let getMapGrid = () => mapGrid;

/**
 * Met à jour le visuel des statistique du joueur
 */
export function updateStats() {
    document.getElementById("player-energy").textContent = `${getPlayer().energy}`;
    document.getElementById("player-score").textContent = `${getPlayer().score}`;
}

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
    
    let newX = player.x + deltaX, newY = player.y + deltaY;

    // S'assure que le joueur ne sort pas des limites et ne marche pas dans les murs
    if (newY >= mapHeight || newX >= mapWidth || newY < 0 || newX < 0 ||
        map[newY][newX] === tile_values.wall) 
        return;

    const tile = map[newY][newX];
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
    
    updateMapTile(player.x, player.y);
    [player.x, player.y] = [newX, newY];
    updateMapTile(getPlayer().x, getPlayer().y, "/assets/tiles/player.png", tile_values.player);
    updateStats();
}

export function updateMapTile(x, y, tilePath = "/assets/tiles/empty.png", tileValue = tile_values.empty) {
    const tileToUpdate = document.getElementById(`tile-${y}-${x}`);
    tileToUpdate.src = tilePath;
    map[y][x] = tileValue;
}