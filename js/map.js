import { getPlayer, updateStats } from "./player.js";
import { gameOver, getGameOver, setGameOver } from "./gameover.js";

// Map dimensions
const mapHeight = 15;
const mapWidth = 25;

// HTML element for the map grid
const mapGrid = document.getElementById("map-table");

// Game map
// The map is a 2D array that contains the values of the tiles
let map = [];

// Tile values
const tile_values = {
    trap : 0,
    treasure : 1,
    wall : 2,
    empty : 3,
    player : 4
};

/**
 * Returns the game map
 * @returns {Array} The game map
 */
export let getTileMap = () => map;

/**
 * Erases the map of the game
 * @returns {void}
 */
export let eraseMap = () => map = [];

/**
 * Returns the map grid HTML element
 * @returns {HTMLElement} The map grid HTML element
 */
export let getMapGrid = () => mapGrid;

/**
 * Generates the map of the game
 * The map is generated randomly with walls, traps and treasures
 * @returns {void}
 */
export function generateMap() {
    for (let y = 0; y < mapHeight; y++) {
        map.push([]);
        let mapRow = document.createElement("div");
        for (let x = 0; x < mapWidth; x++) {
            const random = Math.random();

            // Insert a random tile in the map
            map[y].push(random < 0.1 ? tile_values.wall : random > 0.9 ? tile_values.treasure : tile_values.trap);

            let tileContainer = document.createElement("div");
            let tile = document.createElement("img");

            // Set the tile image according to the tile value
            tile.src = map[y][x] === tile_values.trap ? "assets/tiles/trap.png" :
                    map[y][x] === tile_values.treasure ? "assets/tiles/treasure.png" :
                    map[y][x] === tile_values.wall ? "assets/tiles/wall.png" :
                    "assets/tiles/empty.png";
            tile.id = `tile-${y}-${x}`

            tileContainer.appendChild(tile).className = "tile-img";
            mapRow.appendChild(tileContainer).className = "tile";
        }
        mapGrid.appendChild(mapRow).className = "map-row";
    }
}

/**
 * Moves the player in the map, checks if the player can move 
 * and applies the effects of the tile the player is on
 * @param {number} deltaX Change in the player's x position
 * @param {number} deltaY Change in the player's y position
 * @returns {void}
 */
export function movePlayer(deltaX, deltaY) {
    let player = getPlayer();

    // Makes sure the player has enough energy to move
    if (player.energy <= 0 || getGameOver()){
        setGameOver(true);
        gameOver();
        return;
    }
    
    // Calculates the new position of the player
    let newX = player.x + deltaX, newY = player.y + deltaY;

    // Checks if the new position is out of bounds or if the tile is a wall
    if (newY >= mapHeight || newX >= mapWidth || newY < 0 || newX < 0 ||
        map[newY][newX] === tile_values.wall) 
        return;

    // Finds the tile at the new position
    const tile = map[newY][newX];

    // Applies the effects of the tile
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
    
    // Updates the player's position and the map
    updateMapTile(player.x, player.y);
    [player.x, player.y] = [newX, newY];
    updateMapTile(getPlayer().x, getPlayer().y, "./assets/tiles/player.png", tile_values.player);
    updateStats();

    // Checks if the player is out of energy
    if (player.energy <= 0) {
        setGameOver(true);
        gameOver();
    }
}

/**
 * Updates the tile at the given position in the map
 * @param {number} tileValue value of the tile to update
 * @param {number} x x coordinate of the tile to update
 * @param {number} y y coordinate of the tile to update
 * @param {string} tilePath path to the tile image
 * @returns {void}
 */
export function updateMapTile(x, y, tilePath = "./assets/tiles/empty.png", tileValue = tile_values.empty) {
    const tileToUpdate = document.getElementById(`tile-${y}-${x}`);
    tileToUpdate.src = tilePath;
    map[y][x] = tileValue;
}
