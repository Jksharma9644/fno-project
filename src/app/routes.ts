import { Routes, RouterModule } from '@angular/router';
import { CanvasJsComponent } from './canvas-js/canvas-js.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { CanvasTimeSeriesComponent } from './canvas-time-series/canvas-time-series.component';

const appRoutes: Routes = [

    {
        path: 'canvas',
        component: CanvasTimeSeriesComponent
    }, 
    {
        path: 'home',
        component: HomeComponent
    },
    { path: '**', redirectTo: 'home' }


]

export const routing = RouterModule.forRoot(appRoutes);