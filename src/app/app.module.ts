import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameContainerComponent } from './game-container/game-container.component';
import { MinefieldComponent } from './minefield/minefield.component';

import { OverlayPanelModule } from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    GameContainerComponent,
    MinefieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    OverlayPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
