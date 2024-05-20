import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Consommationn } from '../../../consommationn';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';
import { QuantiteConso } from '../../../quantite-conso';

@Component({
  selector: 'app-ajout-consommation',
  templateUrl: './ajout-consommation.component.html',
  styleUrl: './ajout-consommation.component.css'
})
export class AjoutConsommationComponent implements OnInit{
  username: String = '';
  Consommation : Consommationn = new Consommationn();
  produitFini: Produit[] = [];
  produitConso: Produit[] = [];
  machines: Machine[] = [];
  quantiteMatiereConso : QuantiteConso[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  role: string = '';
  constructor(private mesService: mesService, private router : Router){}
  ngOnInit(): void {
    this.getProduitsFini();
    this.getMachinesList();
    this.getProduitConso();
    this.username = localStorage.getItem('username') || '';
  }
  ajoutConsommation(): void {
    this.Consommation.quantiteMatiereConso = this.quantiteMatiereConso;
    this.mesService.ajoutConsommation(this.Consommation).subscribe({
      next: (data) => {
        this.successMessage = 'Consommation ajoutée avec succès';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout de la consommation';
      }
    });
  }
  getProduitsFini(): void {
    this.mesService.getProduitFini().subscribe({
      next: (data) => {
        this.produitFini = data;
      },
      error: (error) => {
       this.errorMessage = 'Erreur lors de la récupération des produits finis';
      }
    });
  }
  getMachinesList(): void {
    this.mesService.getMachinesList().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des machines';
      }
    });
  }
  ajouterQuantiteMatiereConso() {
    this.quantiteMatiereConso.push({ nomMatiere: '', quantite: 0 });
  }

  supprimerQuantiteMatiereConso(index: number) {
    this.quantiteMatiereConso.splice(index, 1);
  }
  getProduitConso():void{
    this.mesService.getProduitConso().subscribe({
      next: (data) => {
        this.produitConso = data;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des produits consommables';
      }
    });
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
