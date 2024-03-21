import { Component } from '@angular/core';
import { Produit } from '../../../produit';
import { mesService } from '../../../messervice';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-prod',
  templateUrl: './list-prod.component.html',
  styleUrl: './list-prod.component.css'
})
export class ListProdComponent {
  produits: Produit[]= [];
  successMessage: string = '';
  errorMessage: string = '';
  searchQuery: string = '';

  constructor(private mesService: mesService, private router : Router) { }
ngOnInit(){
this.getProduitsList();
}
  getProduitsList(): void{
    this.mesService.getProduitsList().subscribe((data: any[]) => {
      this.produits = data;
    });
  }

  deleteProduit(id: number): void {
    this.mesService.deleteProduit(id).subscribe((data: any) => {
      console.log(data);
      this.successMessage = 'Produit supprimé avec succès !';
      this.errorMessage = '';
      this.getProduitsList();
    }, (error) => {
      console.error(error);
      this.errorMessage = 'Erreur lors de la suppression du produit.';
      this.successMessage = '';
    });
  }
  // Search Produit
  SearchProduit(): void {
    if (this.searchQuery.trim() !== '') {
      // Convertir la chaîne de recherche en minuscules pour une recherche insensible à la casse
      const searchValue = this.searchQuery.toLowerCase();
      // Filtrer les produits en fonction de la chaîne de recherche
      const filteredProduits = this.produits.filter(produit => {
        // Convertir le nom du produit en minuscules pour une comparaison insensible à la casse
        const lowercaseName = produit.name.toLowerCase();
        // Vérifier si le nom du produit contient la chaîne de recherche
        return lowercaseName.includes(searchValue);
      });
      // Mettre à jour la liste des produits avec les produits filtrés
      this.produits = filteredProduits;
    } else {
      // Si la chaîne de recherche est vide, réinitialiser la liste des produits
      this.getProduitsList();
    }
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