// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Pour les requêtes HTTP
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Assurez-vous que le chemin vers votre fichier de routes est correct
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ConsommationComponent } from './admin/Consommation/consommation.component';
import { DashComponent } from './admin/dash/dash.component';
import { AjoutmachineComponent } from './admin/machine/ajoutmachine/ajoutmachine.component';
import { ListmachineComponent } from './admin/machine/listmachine/listmachine.component';
import { EditmachineComponent } from './admin/machine/editmachine/editmachine.component';
import { MachineComponent } from './admin/machine/machine.component';
import { AjoutproduitComponent } from './admin/Produit/ajout-produit/ajout-produit.component';
import { ListProdComponent } from './admin/Produit/list-prod/list-prod.component';
import { EditProduitComponent } from './admin/Produit/editproduit/editproduit.component';
import { ProduitComponent } from './admin/Produit/produit/produit.component';
import { ParametresComponent } from './admin/parametres/parametres.component';
import { RebutComponent } from './admin/rebut/rebut.component';
import { mesService } from './messervice';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { AdduserComponent } from './admin/utilisateur/adduser/adduser.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { ListuserComponent } from './admin/utilisateur/listuser/listuser.component';
import { AjoutConsommationComponent } from './admin/Consommation/ajout-consommation/ajout-consommation.component';
import { ErrorComponent } from './error/error.component';
import { ListconsommationComponent } from './admin/Consommation/listconsommation/listconsommation.component';

// Fonction pour récupérer le token JWT depuis les cookies
export function tokenGetter() {
  return document.cookie; // Ajustez cette fonction selon votre méthode de stockage de token
}

@NgModule({
  declarations: [
      DashComponent,
      AjoutproduitComponent,
      ListProdComponent,
      EditProduitComponent,
      ProduitComponent,
      AjoutmachineComponent,
      ListmachineComponent,
      EditmachineComponent,
      MachineComponent,
      ConsommationComponent,
      ParametresComponent,
      RebutComponent,
      LoginComponent,
      UtilisateurComponent,
      AdduserComponent,
      ListuserComponent,
      AjoutConsommationComponent,
      ErrorComponent,
      ListconsommationComponent,
      // Ajoutez d'autres déclarations de composants ici si nécessaire
    ],
    imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["exemple.com"], // ajustez ce domaine à votre environnement
        disallowedRoutes: []
      }
    }),
  ],
  providers: [mesService],
  bootstrap: []
})
export class AppModule { }
