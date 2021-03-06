import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { Angular2CsvModule } from 'angular2-csv';
import {routing} from './routes';
import { HomeComponent } from './home/home.component';
import { CanvasTimeSeriesComponent } from './canvas-time-series/canvas-time-series.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    CanvasTimeSeriesComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Angular2CsvModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
