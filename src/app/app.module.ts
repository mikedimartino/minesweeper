import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameContainerComponent } from './game-container/game-container.component';
import { MinefieldComponent } from './minefield/minefield.component';


@NgModule({
  declarations: [
    AppComponent,
    GameContainerComponent,
    MinefieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
