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
import { DashempComponent } from './emp/dashemp/dashemp.component';
import { ErrorComponent } from './error/error.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { AdduserComponent } from './admin/utilisateur/adduser/adduser.component';
import { ListuserComponent } from './admin/utilisateur/listuser/listuser.component';
import { AjoutConsommationComponent } from './admin/Consommation/ajout-consommation/ajout-consommation.component';

export const routes: Routes = [

    {
        path:'',component:LoginComponent
    },    
    {
        path:'dash',component:DashComponent ,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'produit',component:ProduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'list-prod',component:ListProdComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'ajout-prod',component:AjoutproduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'edit-prod/:id',component:EditProduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'machine',component:MachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'list-mach',component:ListmachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'ajout-mach',component:AjoutmachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'edit-mach/:id',component:EditmachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'consommation',component:ConsommationComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'rebut',component:RebutComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'parametres',component:ParametresComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
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
        path:'ajout-conso',component:AjoutConsommationComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'error',component:ErrorComponent
    },
    {
        path:'user',component:DashempComponent,canActivate: [AuthGuard],data: { expectedRole: 'USER' }
    },
    

    
  
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}