import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashComponent } from './admin/dash/dash.component';
import { ProduitComponent } from './admin/Produit/produit/produit.component';
import { ListProdComponent } from './admin/Produit/list-prod/list-prod.component';
import { AjoutproduitComponent } from './admin/Produit/ajout-produit/ajout-produit.component';
import { EditProduitComponent } from './admin/Produit/editproduit/editproduit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashComponent,
    ProduitComponent,
    ListProdComponent,
    AjoutproduitComponent,
    EditProduitComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class AppModule { }
