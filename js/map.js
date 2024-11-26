import { getPlayer } from "./player.js";

const mapHeight = 15;
const mapWidth = 25;

const mapGrid = document.getElementById("map-table");

// Carte du jeu
let map = [];

// Carte des emplacement disponible au joueur et aux ennemies
let playerMap = [];

const TILE_VALUES = {

    // Valeurs des tuiles de la carte de déplacement du joueur
    AVAILABLE : "-",
    PLAYER : "player",
    UNAVAILABLE : "x",

    // Valeur pour la carte du jeu
    TRAP : 0,
    TREASURE : 1,
    WALL : 2,
    EMPTY : 3
};

export let getTileMap = () => map;
export let getPlayerMap = () => playerMap;

export function FillMapGrid() {
    for (let row = mapHeight - 1; row >= 0; row--) {
        let mapRow = document.createElement("tr");
        for (let col = 0; col < mapWidth; col++) {
            let tileContainer = document.createElement("td");

            let tile = document.createElement("img");
            tile.src = map[row][col] === TILE_VALUES.TRAP ? "/assets/tiles/trap.png" :
                    map[row][col] === TILE_VALUES.TREASURE ? "/assets/tiles/treasure.png" :
                    "/assets/tiles/wall.png";
            tile.id = `tile-${row}-${col}`
            tileContainer.appendChild(tile).className = "tile-img";
            mapRow.appendChild(tileContainer).className = "tile";
        }
        mapGrid.appendChild(mapRow).className = "map-row";
    }
}

export function UpdateMapGridAndInfo() {
    let player = document.getElementById("player");
    player.style.setProperty("--player-y", getPlayer().y);
    player.style.setProperty("--player-x", getPlayer().x);
    let tileToUpdate = document.getElementById(`tile-${getPlayer().y}-${getPlayer().x}`);
    tileToUpdate.src = "/assets/tiles/empty.png";
    document.getElementById("player-energy").textContent = `${getPlayer().energy} / 40`;
    let scoreText = document.getElementById("player-score").textContent = `${getPlayer().score}`;
}

export function GenerateMap() {
    for (let y = 0; y < mapHeight; y++) {
        map.push([]);
        playerMap.push([]);
        for (let x = 0; x < mapWidth; x++) {
            const random = Math.random();

            // Insère les tuiles dans la carte de déplacement du joueur
            playerMap[y].push(random < 0.1 ? TILE_VALUES.UNAVAILABLE : TILE_VALUES.AVAILABLE);

            // Insère les tuiles dans la carte du jeu
            map[y].push(random < 0.1 ? TILE_VALUES.WALL : random > 0.9 ? TILE_VALUES.TREASURE : TILE_VALUES.TRAP);
        }
    }
}

/**
 * Gère le déplacement du joueur, le score du joueur et l'énergie du joueur lors
 * d'un déplacement du joueur
 * @param {number} deltaX Changement de la position x du joueur
 * @param {number} deltaY Changement de la position y du joueur
 * @returns Retourne rien
 */
export function MovePlayer(deltaX, deltaY) {
    let player = getPlayer();

    // S'assure qu'il reste de l'énergie au joueur sinon préviens le joueur de bouger
    if (player.energy <= 0) return;
    
    let newX = player.x + deltaX, newY = player.y + deltaY;

    // S'assure que le joueur ne sort pas des limites et ne marche pas dans les murs
    if (newY >= mapHeight || newX >= mapWidth || newY < 0 || newX < 0 ||
        playerMap[newY][newX] === TILE_VALUES.UNAVAILABLE) 
        return;

    playerMap[player.y][player.x] = TILE_VALUES.AVAILABLE;
    playerMap[newY][newX] = TILE_VALUES.PLAYER;
    [player.x, player.y] = [newX, newY];

    const tile = map[newY][newX];
    if (tile === TILE_VALUES.TRAP) {
        player.energy--;
        player.score -= 50;
    }
    else if (tile === TILE_VALUES.TREASURE) {
        player.score += 1000;
    }
    tile !== TILE_VALUES.EMPTY && RemoveTileFromMap(player.x, player.y);

    UpdateMapGridAndInfo();
}

export function RemoveTileFromMap(x, y) {
    map[y][x] = TILE_VALUES.EMPTY;
}