export class MinefieldSquare {
  row: number;
  column: number;
  isMine: boolean;
  neighboringMines: number;
  revealed: boolean;
  flagged: boolean;
  cssClasses: {};

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.isMine = false;
    this.neighboringMines = 0;
    this.revealed = false;
    this.flagged = false;
    this.cssClasses = {
      'minefield-square': true,
      'unrevealed': true
    }
  }

  reveal(): void {
    this.revealed = true;
    this.flagged = false;
    this.cssClasses = {
      'minefield-square': true,
      'revealed': true,
      'mine': this.isMine
    };
  }

  getColor(): string {
    if (this.flagged) return '#FFFFFF';
    if (this.isMine) return '#000000';
    switch(this.neighboringMines) {
      case 1: return '#0000FF';
      case 2: return '#32CD32';
      case 3: return '#FF0000';
      case 4: return '#800080';
      case 5: return '#800000';
      case 6: return '#00FFFF';
      default: return 'transparent';
    }
  }
}
