import { Component, ViewEncapsulation, } from '@angular/core';
import { MinefieldSquare } from "../../classes/minefield-square";
import { GameSettings } from "../../classes/game-settings";
import { GameService } from "../../services/game.service";

@Component({
  selector: 'minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MinefieldComponent {

  constructor(public game: GameService) { }

}
