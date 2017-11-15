import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MinefieldSquare, GameState } from "../custom-types";

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
  mines: number = 10;
  minefield: MinefieldSquare[][];
  gameState: GameState;
  revealedCount = 0;
  squaresToReveal: number;

  constructor() { }

  ngOnInit() { 
    this.gameState = GameState.InProgress;
  }

  buildMinefield(rows: number, columns: number, mines: number): void {
    this.rows = rows;
    this.columns = columns;
    this.totalSquares = rows * columns;
    this.mines = mines > this.totalSquares ? this.totalSquares : mines;
    this.squaresToReveal = this.totalSquares - this.mines;

    this.minefield = [];
    for (let i = 0; i < rows; i++) {
      this.minefield[i] = [];
      for (let j = 0; j < columns; j++) {
        this.minefield[i][j] = new MinefieldSquare(i, j);
      }
    }

    // Fill in mines and set neighboringMines counts
    let r: number;
    let c: number;
    for (let i = 0; i < mines; i++) {
      while (true) {
        r = this.getRandomNumber(0, rows - 1);
        c = this.getRandomNumber(0, columns - 1);
        if (!this.minefield[r][c].isMine) {
          this.setMine(r, c);
          break;
        }
      }
    }

    this.gameState = GameState.InProgress;
    this.revealedCount = 0;
  }

  squareClicked(r: number, c: number) {
    if (this.gameState === GameState.Defeat || this.gameState === GameState.Victory) return;

    const square = this.minefield[r][c];
    if (square.revealed) return;

    this.revealSquare(square);
    if (square.isMine) {
      this.gameState = GameState.Defeat;
      console.log("BOOM! You lost!")
    } else if (square.neighboringMines === 0) {
      this.revealSafeNeighbors(r, c);
    }
  }

  private revealSafeNeighbors(r: number, c: number) {
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

    square.revealed = true;
    this.revealedCount++;
    if (this.revealedCount === this.squaresToReveal) {
      this.gameState = GameState.Victory;
      console.log("Congratulations! You won!");
    }
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
