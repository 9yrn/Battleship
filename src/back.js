import { Player } from "./players/player.js";
import { Ship } from "./board/ships.js";
import { parseCoordinate } from "./board/gameboard.js";

// Standard Battleship Fleet
const SHIPS = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Cruiser", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Patrol Boat", length: 2 },
];

let currentShipIndex = 0;
let orientation = "horizontal";

const human = new Player("Player", "human");
const computer = new Player("Computer", "computer");

const statusEl = document.getElementById("status");
const rotateBtn = document.getElementById("rotate-btn");
const setupControls = document.getElementById("setup-controls");
const playerBoardEl = document.getElementById("player-board");
const computerBoardEl = document.getElementById("computer-board");

playerBoardEl.classList.add("placing");

// 1. Rotate Button
rotateBtn.addEventListener("click", () => {
  orientation = orientation === "horizontal" ? "vertical" : "horizontal";
  rotateBtn.textContent = `Orientation: ${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`;
});

// 2. Render Board
function renderBoard(gameboard, container, isEnemy = false) {
  container.innerHTML = "";
  gameboard.grid.forEach((row) => {
    row.forEach((square) => {
      const btn = document.createElement("button");
      btn.classList.add("cell");
      btn.dataset.coord = square.coordinate;

      if (!isEnemy && square.ship) btn.classList.add("ship");
      if (square.isHit) btn.classList.add(square.ship ? "hit" : "miss");

      container.appendChild(btn);
    });
  });
}

// 3. Helper: Get coordinates a ship would occupy
function getShipCoords(startCoord, length, orient) {
  const [row, col] = parseCoordinate(startCoord);
  const coords = [];
  for (let i = 0; i < length; i++) {
    const r = orient === "vertical" ? row + i : row;
    const c = orient === "horizontal" ? col + i : col;
    if (r >= 10 || c >= 10) return null; // out of bounds
    coords.push(`${String.fromCharCode(65 + r)}${c + 1}`);
  }
  return coords;
}

// 4. Hover Preview on Player Board
playerBoardEl.addEventListener("mouseover", (e) => {
  if (currentShipIndex >= SHIPS.length) return;
  const startCoord = e.target.dataset.coord;
  if (!startCoord) return;

  clearPreview();
  const ship = SHIPS[currentShipIndex];
  const coords = getShipCoords(startCoord, ship.length, orientation);

  if (!coords) {
    e.target.classList.add("invalid-preview");
    return;
  }

  const hasCollision = coords.some((c) => human.gameboard.getSquare(c)?.ship);
  const className = hasCollision ? "invalid-preview" : "preview";

  coords.forEach((coord) => {
    const cell = playerBoardEl.querySelector(`[data-coord="${coord}"]`);
    if (cell) cell.classList.add(className);
  });
});

playerBoardEl.addEventListener("mouseleave", clearPreview);

function clearPreview() {
  playerBoardEl
    .querySelectorAll(".preview, .invalid-preview")
    .forEach((el) => el.classList.remove("preview", "invalid-preview"));
}

// 5. Place Ship on Click
playerBoardEl.addEventListener("click", (e) => {
  if (currentShipIndex >= SHIPS.length) return;
  const startCoord = e.target.dataset.coord;
  if (!startCoord) return;

  const currentShip = SHIPS[currentShipIndex];

  try {
    human.gameboard.placeShip(
      new Ship(currentShip.length),
      startCoord,
      orientation
    );
    currentShipIndex++;

    if (currentShipIndex < SHIPS.length) {
      const nextShip = SHIPS[currentShipIndex];
      statusEl.textContent = `Place your ${nextShip.name} (length: ${nextShip.length})`;
    } else {
      // Setup Complete -> Start Game
      clearPreview();
      playerBoardEl.classList.remove("placing");
      setupControls.style.display = "none";
      statusEl.textContent = "Fleet ready! Attack enemy waters.";
      placeComputerShips(computer.gameboard, SHIPS);
      computerBoardEl.classList.remove("locked");
    }

    updateUI();
  } catch (err) {
    statusEl.textContent = `Cannot place: ${err.message}`;
  }
});

// 6. Computer Random Fleet Placement
function placeComputerShips(gameboard, fleet) {
  fleet.forEach(({ length }) => {
    let placed = false;
    while (!placed) {
      const r = String.fromCharCode(65 + Math.floor(Math.random() * 10));
      const c = Math.floor(Math.random() * 10) + 1;
      const orient = Math.random() < 0.5 ? "horizontal" : "vertical";
      try {
        gameboard.placeShip(new Ship(length), `${r}${c}`, orient);
        placed = true;
      } catch {
        // Retry until valid cell is chosen
      }
    }
  });
}

// 7. Attack Turn Loop
computerBoardEl.addEventListener("click", (e) => {
  if (currentShipIndex < SHIPS.length) return;
  const coord = e.target.dataset.coord;
  if (
    !coord ||
    e.target.classList.contains("hit") ||
    e.target.classList.contains("miss")
  )
    return;

  // Human turn
  human.attack(computer.gameboard, coord);
  if (computer.gameboard.areAllSunk()) {
    statusEl.textContent = "VICTORY! You sank all enemy ships!";
    computerBoardEl.style.pointerEvents = "none";
    updateUI();
    return;
  }

  // Computer turn
  computer.randomAttack(human.gameboard);
  if (human.gameboard.areAllSunk()) {
    statusEl.textContent = "DEFEAT! Enemy sank your fleet!";
    computerBoardEl.style.pointerEvents = "none";
    updateUI();
    return;
  }

  statusEl.textContent = "Your Turn: Click enemy waters";
  updateUI();
});

function updateUI() {
  renderBoard(human.gameboard, playerBoardEl, false);
  renderBoard(computer.gameboard, computerBoardEl, true);
}

// Initial draw
updateUI();
