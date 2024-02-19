import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashComponent } from './admin/dash/dash.component';

export const routes: Routes = [

    {
        path:'',component:AppComponent
    },    
    {
        path:'dashadmin',component:DashComponent
    }

];
