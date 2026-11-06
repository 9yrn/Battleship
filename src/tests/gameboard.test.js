import { Gameboard } from "../board/gameboard.js";
import { Ship } from "../board/ships.js";

describe("Gameboard", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = new Gameboard();
    ship = new Ship(3);
  });

  test("places ship at coordinates horizontally", () => {
    board.placeShip(ship, "A1", "horizontal");
    expect(board.getSquare("A1").ship).toBe(ship);
    expect(board.getSquare("A2").ship).toBe(ship);
    expect(board.getSquare("A3").ship).toBe(ship);
  });

  test("rejects ship placement out of bounds", () => {
    expect(() => {
      board.placeShip(ship, "A9", "horizontal");
    }).toThrow("Ship extends beyond board boundary");
  });

  test("receiveAttack hits ship and registers damage", () => {
    board.placeShip(ship, "A1", "horizontal");
    const result = board.receiveAttack("A2");

    expect(result).toBe("hit");
    expect(ship.hits).toBe(1);
    expect(board.getSquare("A2").isHit).toBe(true);
  });

  test("receiveAttack records missed attacks", () => {
    board.placeShip(ship, "C3", "horizontal");
    const result = board.receiveAttack("E4");

    expect(result).toBe("miss");
    expect(board.missedAttacks).toContain("E4");
  });

  test("allSunk reports true when all ships sink", () => {
    const smallShip = new Ship(1);
    board.placeShip(smallShip, "A1", "horizontal");
    board.receiveAttack("A1");

    expect(board.areAllSunk()).toBe(true);
  });
});
