import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { Angular2CsvModule } from 'angular2-csv';
import { CanvasJsComponent } from './canvas-js/canvas-js.component';
import {routing} from './routes';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CanvasJsComponent,
    HomeComponent,
    
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
