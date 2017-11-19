import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MinefieldComponent } from "../minefield/minefield.component";
import { GameSettings } from "../../classes/game-settings";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GameService } from "../../services/game.service";

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GameContainerComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(public game: GameService) { }

  ngOnInit() {
    this.settingsForm = new FormGroup({
      difficulty: new FormControl(this.game.difficulty),
      customHeight: new FormControl(this.game.customHeight),
      customWidth: new FormControl(this.game.customWidth),
      customMines: new FormControl(this.game.customMines),
    });
    this.game.newGame();
  }

  settingsChangeConfirmed(): void {
    this.game.newGame(this.settingsForm.value as GameSettings);
  }

}
