import { Ship } from "../board/ships.js";

describe("Ship class", () => {
  test("should create a ship with the correct length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  test("should increment hits when hit() is called", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("should return true for isSunk() when hits equal length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
