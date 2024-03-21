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

export const routes: Routes = [

    {
        path:'',component:LoginComponent
    },    
    {
        path:'dashadmin',component:DashComponent ,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/produit',component:ProduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/list-prod',component:ListProdComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/ajout-prod',component:AjoutproduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/edit-prod/:id',component:EditProduitComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/machine',component:MachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/list-mach',component:ListmachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/ajout-mach',component:AjoutmachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/edit-mach/:id',component:EditmachineComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/consommation',component:ConsommationComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/rebut',component:RebutComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'parametres',component:ParametresComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'utilisateur',component:UtilisateurComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/ajout-util',component:AdduserComponent ,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
    },
    {
        path:'admin/list-util',component:ListuserComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }
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