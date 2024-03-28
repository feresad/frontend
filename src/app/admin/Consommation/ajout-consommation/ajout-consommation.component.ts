import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Consommationn } from '../../../consommationn';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';

@Component({
  selector: 'app-ajout-consommation',
  templateUrl: './ajout-consommation.component.html',
  styleUrl: './ajout-consommation.component.css'
})
export class AjoutConsommationComponent implements OnInit{
  username: String = '';
  Consommation : Consommationn = new Consommationn();
  produits: Produit[] = [];
  machines: Machine[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private mesService: mesService, private router : Router){}
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.getProduitsList();
    this.getMachinesList();
  }
  ajoutConsommation(): void {
    this.mesService.ajoutConsommation(this.Consommation).subscribe({
      next: (data) => {
        this.successMessage = 'Consommation ajoutée avec succès';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout de la consommation';
        console.error('Ajout consommation error', error);
      }
    });
  }
  getProduitsList(): void {
    this.mesService.getProduitsList().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (error) => {
        console.error('Get produits error', error);
      }
    });
  }
  getMachinesList(): void {
    this.mesService.getMachinesList().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (error) => {
        console.error('Get machines error', error);
      }
    });
  }


  logout(): void {
    this.mesService.logout().subscribe({
      next: (data) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
}
}
