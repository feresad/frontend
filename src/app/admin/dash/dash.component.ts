import { Component } from '@angular/core';
import { Produit } from '../../produit';
import { mesService } from '../../messervice';
import { RouterModule , Router } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.css',
})
export class DashComponent {
  produits: Produit[]= [];
  nbproduits: number = 0;
  nbMachine: number = 0;
  nbConsommation: number = 0;
  nbuser: number = 0;

  constructor(private mesService: mesService, private router :Router) { }
ngOnInit(){
this.getProduitsList();
this.CountProduit();
this.CountMachine();
this.CountConsommation();
this.countUser();
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
      this.nbConsommation = data;
    });
  }
  countUser(): void {
    this.mesService.countUser().subscribe((data: any) => {
      this.nbuser = data;
    });
  }

   logout(): void {
    this.mesService.logout().subscribe({
      next: (data) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
}

}
