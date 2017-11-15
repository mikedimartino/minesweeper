export class MinefieldSquare {
  row: number;
  column: number;
  isMine: boolean;
  neighboringMines: number;
  revealed: boolean;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.isMine = false;
    this.neighboringMines = 0;
    this.revealed = false;
  }
}

export enum GameState {
  InProgress,
  Victory,
  Defeat
}

export enum GameDifficulty {
  Beginner,
  Intermediate,
  Expert,
  Custom
}

export class GameSettings {
  height: number;
  width: number;
  mines: number;

  constructor(height, width, mines) {
    this.height = height;
    this.width = width;
    this.mines = mines;
  }
}