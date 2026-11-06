import { Player } from "../players/player.js";
import { Gameboard } from "../board/gameboard.js";
import { Ship } from "../board/ships.js";

describe("Player Class", () => {
  let player;
  let computer;
  let enemyBoard;

  beforeEach(() => {
    player = new Player("Alice", "human");
    computer = new Player("Computer", "computer");
    enemyBoard = new Gameboard();
  });

  test("initializes with a name, type, and its own Gameboard", () => {
    expect(player.name).toBe("Alice");
    expect(player.type).toBe("human");
    expect(player.gameboard).toBeInstanceOf(Gameboard);
    expect(computer.type).toBe("computer");
  });

  test("player can attack enemy gameboard", () => {
    const enemyShip = new Ship(2);
    enemyBoard.placeShip(enemyShip, "A1", "horizontal");

    const result = player.attack(enemBoard, "A1");
    expect(result).toBe("hit");
    expect(enemyShip.hits).toBe(1);
  });

  test("player cannot attack the same coordinate twice", () => {
    player.attack(enemyBoard, "B3");
    expect(() => player.attack(enemyBoard, "B3")).toThrow(
      "Coordinate B3 already been attacked",
    );
  });

  test("computer never attacks the same coordinate twice over multiple turns", () => {
    for (let i = 0; i < 20; i++) {
      computer.randomAttack(enemyBoard);
    }
    expect(computer.attackCoordinate.size).toBe(20);
  });
});
