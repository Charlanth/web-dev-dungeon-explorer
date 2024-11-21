console.log("JavaScript is running!");

let map = [];
let playerMap = []; // cartes des emplacement disponible au joueur

let playerY = 8;
let playerX = 13;

let playerScore = 0;
let playerEnergy = 40;

// Valeurs des tuiles de la carte de déplacement du joueur
let availableTileValue = '-';
let playerValue = 'player';
let unavailableTileValue = 'x';

const mapHeight = 15;
const mapWidth = 25;

// Valeur pour la carte du jeu
let trapValue = 0;
let treasureValue = 1;
let wallValue = 2;
let emptyValue = 3;

let topPressed = false;
let leftPressed = false;
let rightPressed = false;
let bottomPressed = false;

const mapGrid = document.getElementById("map-table");

// Les bouttons pour controller le joueur
const buttonUp = document.getElementById("button-up");
const buttonDown = document.getElementById("button-down");
const buttonLeft = document.getElementById("button-left");
const buttonRight = document.getElementById("button-right");

for (let y = 0; y < mapHeight; y++) {
    map.push([]);
    playerMap.push([]);
    for (let x = 0; x < mapWidth; x++) {
        playerMap[y].push(availableTileValue);

        // Place les tuiles de la carte
        if (Math.random() < 0.1 && y !== playerY && x !== playerX) {
            map[y].push(wallValue);

            // remplace les tuiles invalides de la carte joueur
            playerMap[y][x] = unavailableTileValue;
        }
        else if (Math.random() > 0.9) {
            map[y].push(treasureValue);
        }
        else {
            map[y].push(trapValue);
        }
    }
}

function FillMapGrid() {
    for (let row = mapHeight - 1; row >= 0; row--) {
        let mapRow = document.createElement("tr");
        for (let col = 0; col < mapWidth; col++) {
            let tileContainer = document.createElement("td");

            let tile = document.createElement("img");
            if (map[row][col] === trapValue) {
                tile.src = "/assets/tiles/trap.png";
            }
            else if (map[row][col] === treasureValue) {
                tile.src = "/assets/tiles/treasure.png";
            }
            else if (map[row][col] === wallValue) {
                tile.src = "/assets/tiles/wall.png";
            }
            tile.id = `tile-${row}-${col}`
            tileContainer.appendChild(tile).className = "tile-img";
            mapRow.appendChild(tileContainer).className = "tile";
        }
        mapGrid.appendChild(mapRow).className = "map-row";
    }
}

function UpdateMapGridAndInfo() {
    let player = document.getElementById("player");
    player.style.setProperty("--player-y", playerY);
    player.style.setProperty("--player-x", playerX);
    let tileToUpdate = document.getElementById(`tile-${playerY}-${playerX}`);
    tileToUpdate.src = "/assets/tiles/empty.png";
    document.getElementById("player-energy").textContent = `${playerEnergy} / 40`;
    let scoreText = document.getElementById("player-score").textContent = `${playerScore}`;
}

playerMap[playerY][playerX] = playerValue;

// imprime les cartes pour visualiser l'information
function LogPlayerMap(){
    console.log("énergie : ", playerEnergy, " score : ",playerScore)
    for(let y = playerMap.length; y >= 0; y--) {
        console.log(playerMap[y]);
    }
}

function RemoveTileFromMap(x, y) {
    map[y][x] == emptyValue;
}

function MovePlayer(x, y) {
    playerMap[playerY][playerX] = availableTileValue;
    playerX += x;
    playerY += y;
    playerMap[playerY][playerX] = playerValue;
    if (map[playerY][playerX] === trapValue) {
        playerEnergy -= 1;
        playerScore -= 50;
        map[playerY][playerX] = emptyValue;
    }
    else if (map[playerY][playerX] === treasureValue) {
        playerScore += 1000;
        map[playerY][playerX] = emptyValue;
    }
    UpdateMapGridAndInfo();
    LogPlayerMap();
}

document.addEventListener("keydown", function(event) {
    if (playerEnergy <= 0)
    {
        console.log("Le joueur n'a plus d'énergie")
        return;
    }
    if (event.key === "w") {
        if(playerY < mapHeight - 1 && playerMap[playerY + 1][playerX] === availableTileValue) {
            MovePlayer(0, 1);
        }
        else {
            console.log("peut pas avancer la")
        }
    }
    if (event.key === "s") {
        if(playerY > 0 && playerMap[playerY - 1][playerX] === availableTileValue) {
            MovePlayer(0, -1);
        }
        else {
            console.log("peut pas avancer la")
        }
    }
    if (event.key === "d") {
        if(playerX < mapWidth - 1 && playerMap[playerY][playerX + 1] === availableTileValue) {
            MovePlayer(1, 0);
        }
        else {
            console.log("peut pas avancer la")
        }
    }
    if (event.key === "a") {
        if(playerX > 0 && playerMap[playerY][playerX - 1] === availableTileValue) {
            MovePlayer(-1, 0);
        }
        else {
            console.log("peut pas avancer la")
        }
    }
});

FillMapGrid()
UpdateMapGridAndInfo()

buttonUp.addEventListener("click", () => MovePlayer(0, 1));
buttonDown.addEventListener("click", () => MovePlayer(0, -1));
buttonLeft.addEventListener("click", () => MovePlayer(-1, 0));
buttonRight.addEventListener("click", () => MovePlayer(1, 0));