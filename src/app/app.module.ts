// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Pour les requêtes HTTP
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Assurez-vous que le chemin vers votre fichier de routes est correct
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ListrebutComponent } from './admin/rebut/listrebut/listrebut.component';
import { AjoutrebutComponent } from './admin/rebut/ajoutrebut/ajoutrebut.component';
import { ListProduitconsoComponent } from './admin/Produit/list-produitconso/list-produitconso.component';
import { OrdrefabricationComponent } from './admin/ordrefabrication/ordrefabrication.component';
import { AjoutordreComponent } from './admin/ordrefabrication/ajoutordre/ajoutordre.component';
import { ListordreeComponent } from './admin/ordrefabrication/listordree/listordree.component';
import { EditOrdreComponent } from './admin/ordrefabrication/edit-ordre/edit-ordre.component';
import { EditRebutComponent } from './admin/rebut/edit-rebut/edit-rebut.component';
import { EditconsoComponent } from './admin/Consommation/editconso/editconso.component';

// Fonction pour récupérer le token JWT depuis les cookies
export function tokenGetter() {
  return document.cookie; // Ajustez cette fonction selon votre méthode de stockage de token
}

@NgModule({
  declarations: [
      DashComponent,
      AjoutproduitComponent,
      ListProdComponent,
      ListProduitconsoComponent,
      EditProduitComponent,
      ProduitComponent,
      AjoutmachineComponent,
      ListmachineComponent,
      EditmachineComponent,
      MachineComponent,
      ConsommationComponent,
      ParametresComponent,
      RebutComponent,
      ListrebutComponent,
      AjoutrebutComponent,
      LoginComponent,
      UtilisateurComponent,
      AdduserComponent,
      ListuserComponent,
      AjoutConsommationComponent,
      ErrorComponent,
      ListconsommationComponent,
      OrdrefabricationComponent,
      AjoutordreComponent,
      ListordreeComponent,
      EditOrdreComponent,
      EditRebutComponent,
      EditconsoComponent,
      // Ajoutez d'autres déclarations de composants ici si nécessaire
    ],
    imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:8080"],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [mesService],
  bootstrap: []
})
export class AppModule { }
