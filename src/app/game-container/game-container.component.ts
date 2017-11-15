import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MinefieldComponent } from "../minefield/minefield.component";
import { GameDifficulty, GameSettings } from "../custom-types";

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GameContainerComponent implements OnInit {

  @ViewChild(MinefieldComponent)
  minefield: MinefieldComponent

  difficultyEnum = GameDifficulty;

  difficulty: GameDifficulty;
  customHeight = 0;
  customWidth = 0;
  customMines = 0;

  beginnerHeight = 9;
  beginnerWidth = 9;
  beginnerMines = 10;
  intermediateHeight = 16;
  intermediateWidth = 16;
  intermediateMines = 40;
  expertHeight = 16;
  expertWidth = 30;
  expertMines = 99;

  constructor() { }

  ngOnInit() {
    this.difficulty = GameDifficulty.Beginner;
    this.newGame();
  }

  newGame() {
    this.minefield.buildMinefield(this.getSettings(this.difficulty));
  }

  getSettings(difficulty: GameDifficulty): GameSettings {
    switch(difficulty) {
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

}
