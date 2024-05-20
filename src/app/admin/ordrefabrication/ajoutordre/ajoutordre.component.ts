import { Component } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Produit } from '../../../produit';
import { OrdreFabrication } from '../../../ordre-fabrication';
import { Machine } from '../../../machine';

@Component({
  selector: 'app-ajoutordre',
  templateUrl: './ajoutordre.component.html',
  styleUrl: './ajoutordre.component.css'
})
export class AjoutordreComponent {
  username: String = '';
  role: string = '';
  produits: Produit[] = [];
  machines: Machine[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  Ordre : OrdreFabrication = new OrdreFabrication();
  constructor(private mesService: mesService, private router :Router) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.getListProduitFini();
    this.getMachineList();
  }
  getListProduitFini(): void {
    this.mesService.getProduitFini().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des produits finis', error);
      }
    });
  }
  getMachineList(): void {
    this.mesService.getMachinesList().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des machines', error);
      }
    });
  }
  ajoutOrdre(): void {
    const idProduitFini = this.Ordre.idProduitFini;
    // Obtenez la quantité associée au plan produit
    this.mesService.getProduitFiniById(idProduitFini).subscribe({
      next: (produit) => {
        // Récupérez la quantité totale du plan produit
        this.Ordre.quantite = produit.quantite;

        // Ajoutez l'ordre de fabrication avec la quantité obtenue
        this.mesService.ajoutOrdreFabrication(this.Ordre).subscribe({
          next: (data) => {
            // Message de succès
            this.successMessage = 'Ordre ajouté avec succès';
            console.log('Ordre ajouté avec succès', data);
          },
          error: (error) => {
            // Message d'erreur
            this.errorMessage = 'Erreur lors de l\'ajout de l\'ordre';
            console.error('Erreur lors de l\'ajout de l\'ordre', error);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du plan produit', error);
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
