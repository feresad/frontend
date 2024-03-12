import { Component } from '@angular/core';
import { Produit } from '../../produit';
import { mesService } from '../../messervice';
import { RouterModule } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-dash',
    standalone: true,
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.css',
    imports: [RouterModule, CommonModule]
})
export class DashComponent {
  produits: Produit[]= [];
  nbproduits: number = 0;
  nbMachine: number = 0;
  nbConsommation: number = 0;

  constructor(private mesService: mesService) { }
ngOnInit(){
this.getProduitsList();
this.CountProduit();
this.CountMachine();
this.CountConsommation();
}

getProduitsList(): void{
  this.mesService.getProduitsList().subscribe((data: any[]) => {
    this.produits = data;
  });
}
  deleteProduit(id: number): void {
    this.mesService.deleteProduit(id).subscribe((data: any) => {
      this.getProduitsList();
    });
  }
  // compter le nombre de produits
  CountProduit(): void {
    this.mesService.CountProduit().subscribe((data: any) => {
      this.nbproduits = data;
    });
  }
  CountMachine(): void {
    this.mesService.CountMachine().subscribe((data: any) => {
      this.nbMachine = data;
    });
  }
  CountConsommation(): void {
    this.mesService.countConsommation().subscribe((data: any) => {
      console.log(data);
      this.nbConsommation = data;
    });
  }
   
}
