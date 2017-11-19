import { Injectable } from '@angular/core';
import { GameSettings } from "../classes/game-settings";
import { MinefieldSquare } from "../classes/minefield-square";

enum GameDifficulty {
  Beginner,
  Intermediate,
  Expert,
  Custom
}

enum GameState {
  Ready,
  InProgress,
  Victory,
  Defeat
}

@Injectable()
export class GameService {
  difficultyEnum = GameDifficulty;

  difficulty: GameDifficulty;
  customHeight = 10;
  customWidth = 15;
  customMines = 5;

  rows: number;
  columns: number;
  totalSquares: number;
  mineCount: number = 10;
  minefield: MinefieldSquare[][];
  gameState: GameState;
  remainingSafeSquares: number;
  settings: GameSettings;

  beginnerHeight = 9;
  beginnerWidth = 9;
  beginnerMines = 10;
  intermediateHeight = 16;
  intermediateWidth = 16;
  intermediateMines = 40;
  expertHeight = 16;
  expertWidth = 30;
  expertMines = 99;

  private mineSquares: MinefieldSquare[];

  constructor () { 
    this.gameState = GameState.Ready;
    this.difficulty = GameDifficulty.Beginner;
    this.settings = this.getSettings();
  }

  newGame(settings?): void {
    if (settings) {
      this.difficulty = settings.difficulty;
      this.customHeight = settings.customHeight > 0 ? settings.customHeight : 1;
      this.customWidth = settings.customWidth > 0 ? settings.customWidth : 1;
      this.customMines = settings.customMines >= 0 ? settings.customMines : 0;
    }
    this.buildMinefield(this.getSettings());
    this.gameState = GameState.Ready;
  }

  buildMinefield(settings: GameSettings): void {
    this.settings = settings;
    this.rows = settings.rows;
    this.columns = settings.columns;
    this.totalSquares = settings.rows * settings.columns;
    this.mineCount = settings.mines >= this.totalSquares ? this.totalSquares - 1 : settings.mines;
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
  }

  squareClicked(event: MouseEvent ,r: number, c: number): void {
    let square = this.minefield[r][c];
    if (square.revealed) return;

    if (event.which === 1) { // Left click
      if (this.gameState === GameState.Ready) {
        // Prevent first click from being a mine
        while (square.isMine) {
          this.buildMinefield(this.settings);
          square = this.minefield[r][c];
        }
        this.gameState = GameState.InProgress;
      } else if (this.gameState === GameState.Defeat || this.gameState === GameState.Victory) {
        return;
      }
      this.revealSquare(square);
      if (square.isMine) {
        this.gameState = GameState.Defeat;
        this.revealMines();
        this.showAlert("Boom! You lost.");
      } else if (square.neighboringMines === 0) {
        this.revealSafeNeighbors(r, c);
      }
    } else if (event.which === 3) { // Right click
      square.flagged = !square.flagged;
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
    if (square.revealed) return;

    square.reveal();
    if (--this.remainingSafeSquares === 0) {
      this.gameState = GameState.Victory;
      this.flagMines();
      this.showAlert("Congratulations! You won!");
    }
  }

  private revealMines(): void {
    this.mineSquares.forEach(s => s.reveal());
  }

  private flagMines(): void {
    this.mineSquares.forEach(s => s.flagged = true);
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

  private getSettings(): GameSettings {
    switch(this.difficulty) {
      case GameDifficulty.Beginner:
        return new GameSettings(this.beginnerHeight, this.beginnerWidth, this.beginnerMines);
      case GameDifficulty.Intermediate:
        return  new GameSettings(this.intermediateHeight, this.intermediateWidth, this.intermediateMines);
      case GameDifficulty.Expert:
        return  new GameSettings(this.expertHeight, this.expertWidth, this.expertMines);
      case GameDifficulty.Custom:
        return  new GameSettings(this.customHeight, this.customWidth, this.customMines);
    }
  }

  private showAlert(message: string) {
    // Use timeout to make sure page renders before alert
    setTimeout(function(){ alert(message); }, 100);
  }
}