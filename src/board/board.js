let rows = 10;
let columns = 10;
const board = [];

export function createBoard() {
  for (let i = 0; i < rows; i++) {
    const rowLetter = String.fromCharCode(65 + i); // Convert row index to letter (A-J)
    board[i] = [];

    for (let j = 0; j < columns; j++) {
      board[i][j] = {
        coordinate: `${rowLetter}${j + 1}`,
        hasShip: false,
        isHit: false,
      };
    }
  }
  return board;
}

export function getBoard() {
  return board;
}
