export class GameSettings {
  rows: number;
  columns: number;
  mines: number;

  constructor(rows, columns, mines) {
    this.rows = rows;
    this.columns = columns;
    this.mines = mines;
  }
}
