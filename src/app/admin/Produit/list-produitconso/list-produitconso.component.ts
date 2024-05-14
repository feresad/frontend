import { Component } from '@angular/core';
import { Produit } from '../../../produit';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-produitconso',
  templateUrl: './list-produitconso.component.html',
  styleUrl: './list-produitconso.component.css'
})
export class ListProduitconsoComponent {
  produits: Produit[]= [];
  successMessage: string = '';
  errorMessage: string = '';
  searchQuery: string = '';
  username: String = '';
  role: string = '';
  constructor(private mesService: mesService, private router : Router) { }
  ngOnInit(){
  this.getProduitsConso();
  this.username = this.mesService.getUsernameFromToken();
  this.role = localStorage.getItem('role') || '';
  }
    getProduitsConso(): void{
      this.mesService.getProduitConso().subscribe((data: any[]) => {
        this.produits = data;
      });
    }
  
    SearchProduit(): void {
      if (this.searchQuery.trim() !== '') {
        const searchValue = this.searchQuery.toLowerCase();
        const filteredProduits = this.produits.filter(produit => {
          const lowercaseName = produit.name.toLowerCase();
          return lowercaseName.includes(searchValue);
        });
        this.produits = filteredProduits;
      } else {
        this.getProduitsConso();
      }
    }
    deleteProduit(id: number): void {
      this.mesService.deleteProduit(id)
        .subscribe(
          (data) => {
            this.successMessage = 'Produit Consommable supprimé avec succès.';
            this.getProduitsConso();
          },
          (error) => {
            this.errorMessage = 'Erreur lors de la suppression du produit Consommable.';
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
