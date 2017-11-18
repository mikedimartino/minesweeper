import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component'
import { GameContainerComponent } from './components/game-container/game-container.component';
import { MinefieldComponent } from './components/minefield/minefield.component';

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
    OverlayPanelModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
