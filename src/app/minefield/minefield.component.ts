import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MinefieldSquare, GameState, GameSettings } from "../custom-types";

@Component({
  selector: 'minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MinefieldComponent implements OnInit {
  @Input() rows: number;// = 20;
  @Input() columns: number;// = 10;

  totalSquares: number;
  mineCount: number = 10;
  minefield: MinefieldSquare[][];
  gameState: GameState;
  remainingSafeSquares: number;

  private mineSquares: MinefieldSquare[];

  constructor() { }

  ngOnInit() { 
    this.gameState = GameState.InProgress;
  }

  buildMinefield(settings: GameSettings): void {
    this.rows = settings.rows;
    this.columns = settings.columns;
    this.totalSquares = settings.rows * settings.columns;
    this.mineCount = settings.mines > this.totalSquares ? this.totalSquares : settings.mines;
    this.remainingSafeSquares = this.totalSquares - this.mineCount;
    this.mineSquares = [];
    this.minefield = [];

    for (let i = 0; i < settings.rows; i++) {
      this.minefield[i] = [];
      for (let j = 0; j < settings.columns; j++) {
        this.minefield[i][j] = new MinefieldSquare(i, j);
      }
    }

    // Fill in mines and set neighboringMines counts
    let r: number;
    let c: number;
    for (let i = 0; i < settings.mines; i++) {
      while (true) {
        r = this.getRandomNumber(0, settings.rows - 1);
        c = this.getRandomNumber(0, settings.columns - 1);
        if (!this.minefield[r][c].isMine) {
          this.setMine(r, c);
          this.mineSquares.push(this.minefield[r][c]);
          break;
        }
      }
    }

    this.gameState = GameState.InProgress;
  }

  squareClicked(event: MouseEvent ,r: number, c: number): void {
    if (this.gameState === GameState.Defeat || this.gameState === GameState.Victory) return;

    const square = this.minefield[r][c];
    if (square.revealed) return;

    if (event.which === 1) { // left click
      this.revealSquare(square);
      if (square.isMine) {
        this.gameState = GameState.Defeat;
        this.revealMines();
      } else if (square.neighboringMines === 0) {
        this.revealSafeNeighbors(r, c);
      }
    }
    else if (event.which === 3) { // right click
      square.flagged = true;
    }
  }

  private revealSafeNeighbors(r: number, c: number): void {
    const _this = this;
    this.getNeighbors(r, c).forEach(function(s) {
      if (s.revealed) return;
      _this.revealSquare(s);
      if (s.neighboringMines === 0) {
        _this.revealSafeNeighbors(s.row, s.column);
      }
    });
  }

  // Reveal square and check for victory
  private revealSquare(square: MinefieldSquare): void {
    if (square.revealed) return; // Why is this needed?

    square.reveal();
    this.remainingSafeSquares--;
    if (this.remainingSafeSquares === 0) {
      this.gameState = GameState.Victory;
      window.alert("Congratulations! You won!");
    }
  }

  private revealMines(): void {
    this.mineSquares.forEach(s => s.reveal());
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private setMine(r: number, c: number): void {
    this.minefield[r][c].isMine = true;
    this.getNeighbors(r, c).forEach(n => n.neighboringMines++);
  }

  private getNeighbors(r: number, c: number): MinefieldSquare[] {
    const neighbors: MinefieldSquare[] = [];
    if (c - 1 >= 0) {
      if (r - 1 >= 0) {
        neighbors.push(this.minefield[r - 1][c - 1]);
      }
      neighbors.push(this.minefield[r][c - 1]);
      if (r + 1 < this.rows) {
        neighbors.push(this.minefield[r + 1][c - 1]);
      }
    }
    if (r - 1 >= 0) {
      neighbors.push(this.minefield[r - 1][c]);
    }
    if (r + 1 < this.rows) {
      neighbors.push(this.minefield[r + 1][c]);
    }
    if (c + 1 < this.columns) {
      if (r - 1 >= 0) {
        neighbors.push(this.minefield[r - 1][c + 1]);
      }
      neighbors.push(this.minefield[r][c + 1]);
      if (r + 1 < this.rows) {
        neighbors.push(this.minefield[r + 1][c + 1]);
      }
    }
    return neighbors;
  }
}
