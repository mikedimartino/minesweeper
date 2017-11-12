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