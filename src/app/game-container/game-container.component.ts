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
  }

  newGame() {
    // this.minefield.buildMinefield(10, 10, 5);
    let settings: GameSettings;
    switch(this.difficulty) {
      case GameDifficulty.Beginner:
        settings = new GameSettings(this.beginnerHeight, this.beginnerWidth, this.beginnerMines);
        break;
      case GameDifficulty.Intermediate:
        settings =  new GameSettings(this.intermediateHeight, this.intermediateWidth, this.intermediateMines);
        break;
      case GameDifficulty.Expert:
        settings =  new GameSettings(this.expertHeight, this.expertWidth, this.expertMines);
        break;
      case GameDifficulty.Custom:
        settings =  new GameSettings(this.customHeight, this.customWidth, this.customMines);
        break;
    }
    this.minefield.buildMinefield(settings.height, settings.width, settings.mines);
  }


}
