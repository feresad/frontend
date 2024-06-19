import { RouterModule, Routes } from '@angular/router';
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
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { AdduserComponent } from './admin/utilisateur/adduser/adduser.component';
import { ListuserComponent } from './admin/utilisateur/listuser/listuser.component';
import { AjoutConsommationComponent } from './admin/Consommation/ajout-consommation/ajout-consommation.component';
import { ListconsommationComponent } from './admin/Consommation/listconsommation/listconsommation.component';
import { ListrebutComponent } from './admin/rebut/listrebut/listrebut.component';
import { AjoutrebutComponent } from './admin/rebut/ajoutrebut/ajoutrebut.component';
import { ListProduitconsoComponent } from './admin/Produit/list-produitconso/list-produitconso.component';
import { OrdrefabricationComponent } from './admin/ordrefabrication/ordrefabrication.component';
import { AjoutordreComponent } from './admin/ordrefabrication/ajoutordre/ajoutordre.component';
import { ListordreeComponent } from './admin/ordrefabrication/listordree/listordree.component';
import { EditOrdreComponent } from './admin/ordrefabrication/edit-ordre/edit-ordre.component';
import { EditRebutComponent } from './admin/rebut/edit-rebut/edit-rebut.component';
import { EditconsoComponent } from './admin/Consommation/editconso/editconso.component';

export const routes: Routes = [

    {
        path:'',component:LoginComponent
    },    
    {
        path:'dash',component:DashComponent ,canActivate: [AuthGuard]
    },
    {
        path:'produit',component:ProduitComponent,canActivate: [AuthGuard]
    },
    {
        path:'list-prodFini',component:ListProdComponent,canActivate: [AuthGuard]
    },
    {
        path:'list-prodConso',component:ListProduitconsoComponent,canActivate: [AuthGuard]
    },
    {
        path:'ajout-prod',component:AjoutproduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'edit-prod/:id',component:EditProduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'machine',component:MachineComponent,canActivate: [AuthGuard]
    },
    {
        path:'list-mach',component:ListmachineComponent,canActivate: [AuthGuard]
    },
    {
        path:'ajout-mach',component:AjoutmachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'edit-mach/:id',component:EditmachineComponent,canActivate: [AuthGuard]
    },
    {
        path:'consommation',component:ConsommationComponent,canActivate: [AuthGuard]
    },
    {
        path:'ajout-conso',component:AjoutConsommationComponent,canActivate: [AuthGuard]
    },
    {
        path:'list-conso',component:ListconsommationComponent,canActivate: [AuthGuard]
    },
    {
        path:'edit-conso/:id',component:EditconsoComponent,canActivate: [AuthGuard]
    },
    {
        path:'rebut',component:RebutComponent,canActivate: [AuthGuard]
    },
    {
        path:'list-rebut',component:ListrebutComponent,canActivate: [AuthGuard]
    },
    {
        path:'edit-rebut/:id',component:EditRebutComponent,canActivate: [AuthGuard]
    },
    {
        path:'ajout-rebut',component:AjoutrebutComponent,canActivate: [AuthGuard]
    },
    {
        path:'parametres',component:ParametresComponent,canActivate: [AuthGuard]
    },
    {
        path:'utilisateur',component:UtilisateurComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'ajout-util',component:AdduserComponent ,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'list-util',component:ListuserComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'ordreFabrication',component:OrdrefabricationComponent,canActivate: [AuthGuard]
    },
    {
        path:'ajoutordre',component:AjoutordreComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'listordre',component:ListordreeComponent,canActivate: [AuthGuard]
    },
    {
        path:'edit-ordre/:id',component:EditOrdreComponent,canActivate: [AuthGuard]
    },
    {
        path:'error',component:ErrorComponent
    },
    

    
  
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}