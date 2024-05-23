import { Component } from '@angular/core';
import { Produit } from '../../produit';
import { mesService } from '../../messervice';
import { RouterModule , Router } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Machine } from '../../machine';
import { Panne } from '../../panne';
import { JwtService } from '../../jwt-service';



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
  username: string = '';
  role: string = '';
  machines: Machine[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  isSidebarOpen: boolean = false;

  constructor(private mesService: mesService, private router :Router,private jwtService: JwtService) { }
ngOnInit(){
this.getProduitsList();
this.CountProduit();
this.CountMachine();
this.CountConsommation();
this.countUser();
this.getMachinesEnPanne();
this.username = localStorage.getItem('username') || '';
const token = localStorage.getItem('authToken');
  if (token) {
    const decodedToken = this.jwtService.getDecodedAccessToken(token);
  }
}
toggleSidebar(): void {
  this.isSidebarOpen = !this.isSidebarOpen;
}
getProduitsList(): void{
  this.mesService.getProduitFini().subscribe((data: any[]) => {
    this.produits = data;
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
  getMachinesEnPanne() {
    this.mesService.getMachinesEnPanne().subscribe((machines: Machine[]) => {
        this.machines = machines;
    });
}
deleteProduit(id: number): void {
  this.mesService.deleteProduit(id)
    .subscribe(
      (data) => {
        this.successMessage = 'Produit Fini supprimé avec succès.';
        this.getProduitsList();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la suppression du produit Fini.';
      }
    );
}

  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('role') || '[]');
    return roles.includes('ADMIN');
  }

   logout(): void {
    this.mesService.logout().subscribe({
      next: (data) => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
}

}
