import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashComponent } from './admin/dash/dash.component';
import { ProduitComponent } from './admin/Produit/produit/produit.component';
import { ListProdComponent } from './admin/Produit/list-prod/list-prod.component';
import { AjoutproduitComponent } from './admin/Produit/ajout-produit/ajout-produit.component';
import { EditProduitComponent } from './admin/Produit/editproduit/editproduit.component';
import { MachineComponent } from './admin/machine/machine.component';
import { ListmachineComponent } from './admin/machine/listmachine/listmachine.component';
import { AjoutmachineComponent } from './admin/machine/ajoutmachine/ajoutmachine.component';
import { EditmachineComponent } from './admin/machine/editmachine/editmachine.component';
import { ConsommationComponent } from './admin/Consommation/consommation.component';
import { RebutComponent } from './admin/rebut/rebut.component';
import { ParametresComponent } from './admin/parametres/parametres.component';

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
    {
        path:'admin/machine',component:MachineComponent
    },
    {
        path:'admin/list-mach',component:ListmachineComponent
    },
    {
        path:'admin/ajout-mach',component:AjoutmachineComponent
    },
    {
        path:'admin/edit-mach/:id',component:EditmachineComponent
    },
    {
        path:'admin/consommation',component:ConsommationComponent
    },
    {
        path:'admin/rebut',component:RebutComponent
    },
    {
        path:'parametres',component:ParametresComponent
    },

];
