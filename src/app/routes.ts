import { Routes, RouterModule } from '@angular/router';
import { CanvasJsComponent } from './canvas-js/canvas-js.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [

    {
        path: 'canvas',
        component: CanvasJsComponent
    }, 
    {
        path: 'home',
        component: HomeComponent
    },
    { path: '**', redirectTo: 'home' }


]

export const routing = RouterModule.forRoot(appRoutes);