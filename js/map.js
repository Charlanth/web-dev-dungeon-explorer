import { getPlayer } from "./player.js";

const mapHeight = 15;
const mapWidth = 25;

const mapGrid = document.getElementById("map-table");

let map = [];

 // cartes des emplacement disponible au joueur et aux ennemies
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
            if (map[row][col] === TILE_VALUES.TRAP) {
                tile.src = "/assets/tiles/trap.png";
            }
            else if (map[row][col] === TILE_VALUES.TREASURE) {
                tile.src = "/assets/tiles/treasure.png";
            }
            else if (map[row][col] === TILE_VALUES.WALL) {
                tile.src = "/assets/tiles/wall.png";
            }
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
            playerMap[y].push(TILE_VALUES.AVAILABLE);
    
            // Place les tuiles de la carte
            if (Math.random() < 0.1) {
                map[y].push(TILE_VALUES.WALL);
    
                // remplace les tuiles invalides de la carte joueur
                playerMap[y][x] = TILE_VALUES.UNAVAILABLE;
            }
            else if (Math.random() > 0.9) {
                map[y].push(TILE_VALUES.TREASURE);
            }
            else {
                map[y].push(TILE_VALUES.TRAP);
            }
        }
    }
}

export function MovePlayer(x, y) {
    if (getPlayer().energy <= 0) {
        console.log("Le joueur n'a plus d'énergie")
        return;
    }
    if (getPlayer().y + y >= mapHeight || getPlayer().x + x >= mapWidth || getPlayer().y + y < 0 || getPlayer().x + x < 0 || playerMap[getPlayer().y + y][getPlayer().x + x] === TILE_VALUES.UNAVAILABLE) {
        console.log("peut pas avancer la")
        return;
    }
    let player = getPlayer();
    playerMap[player.y][player.x] = TILE_VALUES.AVAILABLE;
    player.x += x;
    player.y += y;
    playerMap[player.y][player.x] = TILE_VALUES.PLAYER;
    if (map[player.y][player.x] === TILE_VALUES.TRAP) {
        player.energy -= 1;
        player.score -= 50;
        RemoveTileFromMap(player.x, player.y);
    }
    else if (map[player.y][player.x] === TILE_VALUES.TREASURE) {
        player.score += 1000;
        RemoveTileFromMap(player.x, player.y);
    }
    UpdateMapGridAndInfo();
}

export function RemoveTileFromMap(x, y) {
    map[y][x] = TILE_VALUES.EMPTY;
}