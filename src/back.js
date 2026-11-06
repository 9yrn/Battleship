import { Player } from "./players/player.js";
import { Ship } from "./board/ships.js";

// 1. Initialize players & DOM elements
const human = new Player("Player", "human");
const computer = new Player("Computer", "computer");

const statusEl = document.getElementById("status");
const playerBoardEl = document.getElementById("player-board");
const computerBoardEl = document.getElementById("computer-board");

// shortcut: Hardcoded ships for testing.
human.gameboard.placeShip(new Ship(3), "A1", "horizontal");
human.gameboard.placeShip(new Ship(2), "C3", "vertical");

computer.gameboard.placeShip(new Ship(3), "B2", "horizontal");
computer.gameboard.placeShip(new Ship(2), "E5", "vertical");

// 2. Render helper
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

// 3. Attack turn listener
computerBoardEl.addEventListener("click", (e) => {
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
    statusEl.textContent = "You win!";
    computerBoardEl.style.pointerEvents = "none";
  } else {
    // Computer turn
    computer.randomAttack(human.gameboard);
    if (human.gameboard.areAllSunk()) {
      statusEl.textContent = "Computer wins!";
      computerBoardEl.style.pointerEvents = "none";
    }
  }

  updateUI();
});

function updateUI() {
  renderBoard(human.gameboard, playerBoardEl, false);
  renderBoard(computer.gameboard, computerBoardEl, true);
}

// Initial draw
updateUI();
