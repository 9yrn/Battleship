export class Gameboard {
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.#createGrid;
    this.ships = [];
    this.missedAttacks = [];
  }

  #createGrid() {
    const board = [];
    for (let i = 0; i < this.rows; i++) {
      const rowLetter = String.fromCharCode(65 + i);
      board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        board[i][j] = {
          coordinate: `${rowLetter}${j + 1}`,
          ship: null, //null if empty, or refers to the ship object
          isHit: false,
        };
      }
    }
    return board;
  }

  getSquare(target) {
    const [r, c] =
      typeof target === "string" ? parseCoordinate(target) : target;
    return this.grid[r]?.[c] ?? null;
  }

  placeShip(ship, startCoordinate, orientation = "horizontal") {
    const [row, col] = parseCoordinate(startCoordinate);

    //Validating boundaries
    if (orientation === "horizontal" && col + ship.length > this.columns) {
      throw new Error("Ship extends beyond board boundary");
    }
    if (orientation === "vertical" && row + ship.length > this.rows) {
      throw new Error("Ship extends beyond board boundary");
    }

    //Validating collisions
    for (let i = 0; i < ship.length; i++) {
      const r = orientation === "vertical" ? row + i : row;
      const c = orientation === "horizontal" ? col + i : col;
      if (this.grid[r][c].ship !== null) {
        throw new Error("Ship already occupied by another");
      }
    }

    //Place ship
    for (let i = 0; i < ship.length; i++) {
      const r = orientation === "vertical" ? row + i : row;
      const c = orientation === "horizontal" ? col + i : col;
      this.grid[r][c].ship = ship;
    }

    this.ships.push(ship);
  }

  receiveAttack(coordinate) {
    const square = this.getSquare(coordinate);
    if (!square) {
      throw new Error("Invalid coordinate");
    }

    if (square.isHit) {
      throw new Error("Square already attacked");
    }

    square.isHit = true;

    if (square.ship) {
      square.ship.hit();
      return "hit";
    }

    this.missedAttacks.push(coordinate);
    return "miss";
  }

  areAllSunk() {
    return this.ships.length > 0 && this.ships.every((ship) => ship.isSunk());
  }
}
