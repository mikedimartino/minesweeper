import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MinefieldComponent } from "../minefield/minefield.component";

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GameContainerComponent implements OnInit {

  @ViewChild(MinefieldComponent)
  minefield: MinefieldComponent

  constructor() { }

  ngOnInit() { }

  newGame() {
    this.minefield.buildMinefield(10, 10, 5);
  }

}
