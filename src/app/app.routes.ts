import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashComponent } from './admin/dash/dash.component';
import { ProduitComponent } from './admin/Produit/produit/produit.component';
import { ListProdComponent } from './admin/Produit/list-prod/list-prod.component';
import { AjoutproduitComponent } from './admin/Produit/ajout-produit/ajout-produit.component';
import { EditProduitComponent } from './admin/Produit/editproduit/editproduit.component';

export const routes: Routes = [

    {
        path:'',component:AppComponent
    },    
    {
        path:'dashadmin',component:DashComponent
    },
    {
        path:'admin/produit',component:ProduitComponent
    },
    {
        path:'admin/list-prod',component:ListProdComponent
    },
    {
        path:'admin/ajout-prod',component:AjoutproduitComponent
    },
    {
        path:'admin/edit-prod/:id',component:EditProduitComponent
    },


];
