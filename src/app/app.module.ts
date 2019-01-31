import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { CanvasGraphComponent } from './canvas-graph/canvas-graph.component';
import { Angular2CsvModule } from 'angular2-csv';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CanvasGraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Angular2CsvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
