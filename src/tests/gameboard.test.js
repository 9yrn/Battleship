import { Gameboard } from "../gameboard.js";
import { Ship } from "../ships.js";

describe("Gameboard", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = new Gameboard();
    ship = new Ship(3);
  });

  test("places ship at coordinates horiontally", () => {
    board.placeShip(ship, 0, 0, "horizontal");
    expect(board.getSquare(0, 0).hasShip).toBe(ship);
    expect(board.getSquare(0, 1).hasShip).toBe(ship);
    expect(board.getSquare(0, 2).hasShip).toBe(ship);
  });

  test("rejects ship placement out of bounds", () => {
    expect(() => {
      board.placeShip(ship, 0, 8, "horizontal");
    }).toThrow("Ship placement is out of bounds");
  });

  test("receiveAttack hits ship and registers damage", () => {
    board.placeShip(ship, 2, 2, "horizontal");
    const result = board.receiveAttack(2, 2);

    expect(result).toBe("hit");
    expect(ship.hits).toBe(1);
    expect(board.getSquare(2, 2).isHit).toBe(true);
  });

  test("receiveAttack records missed attacks", () => {
    board.placeShip(ship, 2, 2, "horizontal");
    const result = board.receiveAttack(4, 3);

    expect(result).toBe("miss");
    expect(board.missedAttacks).toContainEqual([5, 5]);
  });

  test("allSunk reports true when all ships sink", () => {
    const smallShip = new Ship(1);
    board.placeShip(smallShip, 0, 0, "horizontal");
    board.receiveAttack(0, 0);

    expect(board.areAllSunk()).toBe(true);
  });
});
