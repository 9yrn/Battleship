import { Gameboard } from "../board/gameboard.js";

export class Player {
  constructor(name = "Player", type = "human") {
    this.name = name;
    this.type = type; //human or computer
    this.gameboard = new Gameboard();
    this.attackCoordinate = new Set(); //to keep track of already attacked coordinates
    this.availableCoordinates = this.#generateAllCoordinates();
  }

  #generateAllCoordinates() {
    const coordinates = [];
    for (let r = 0; r < 10; r++) {
      const rowLetter = String.fromCharCode(65 + r);
      for (let c = 0; c < 10; c++) {
        coordinates.push(`${rowLetter}${c + 1}`);
      }
    }
    return coordinates;
  }

  attack(enemyBoard, coordinate) {
    if (this.attackCoordinate.has(coordinate)) {
      throw new Error(`Coordinate ${coordinate} already attacked`);
    }

    const result = enemyBoard.receiveAttack(coordinate);
    this.attackCoordinate.add(coordinate);

    //Remove from available coordinates
    const index = this.availableCoordinates.indexOf(coordinate);
    if (index !== -1) {
      this.availableCoordinates.splice(index, 1);
    }

    return result;
  }

  randomAttack(enemyBoard) {
    if (this.availableCoordinates.length === 0) {
      throw new Error("No remaining coordinates to attack");
    }

    //Pick an unattacked coordinate randomly (ensures it doesnt repeat)
    const randomIndex = Math.floor(
      Math.random() * this.availableCoordinates.length,
    );
    const targetCoordinate = this.availableCoordinates[randomIndex];

    return this.attack(enemyBoard, targetCoordinate);
  }
}
