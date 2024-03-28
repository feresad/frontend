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
  username: String = '';

  constructor(private mesService: mesService, private router : Router) { }
ngOnInit(){
this.getProduitsList();
this.username = localStorage.getItem('username') || '';
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
      const searchValue = this.searchQuery.toLowerCase();
      const filteredProduits = this.produits.filter(produit => {
        const lowercaseName = produit.name.toLowerCase();
        return lowercaseName.includes(searchValue);
      });
      this.produits = filteredProduits;
    } else {
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