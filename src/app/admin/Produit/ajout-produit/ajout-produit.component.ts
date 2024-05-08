import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../../messervice';
import { CommonModule } from '@angular/common';
import { MatierePremier } from '../../../matiere-premier';

@Component({
    selector: 'app-ajoutproduit',
    templateUrl: './ajout-produit.component.html',
    styleUrls: ['./ajout-produit.component.css'],
})
export class AjoutproduitComponent implements OnInit {
  produit: Produit = new Produit();
  produitType: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  username: String = '';
  role:String = '';
  produits: Produit[] = [];
  matieresPremieres: MatierePremier[] = [];
  
  constructor(private mesService: mesService, private router : Router){}

  ngOnInit():void{
    this.username = this.mesService.getUsernameFromToken();
    this.role = localStorage.getItem('roles') || '';
    this.getProduitsConso();
  }
  ajouterProduitFini(): void {
    this.produit.matieresPremieres = this.matieresPremieres;
    this.mesService.ajoutProduitFini(this.produit)
      .subscribe(
        (data) => {
          this.successMessage = 'Produit Fini ajouté avec succès.';
          this.produit = new Produit();
          // Ideally, navigate to a success page or refresh the list
        },
        (error) => { // Catch the error here
          this.errorMessage = error.message; // Extract the error message
        }
      );
  }
  ajouterProduitConso(): void {
    this.mesService.ajoutProduitConso(this.produit)
      .subscribe(
        (data) => {
          this.successMessage = 'Produit Consommable ajouté avec succès.';
          this.produit = new Produit();
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Erreur lors de l\'ajout d\'un produit Consommable.';
        }
      );
  }
  ajouterMatierePremiere() {
    this.matieresPremieres.push({ name: '', quantite: 0 }); // Ajoute un objet vide au tableau
  }

  // Méthode pour supprimer une matière première
  supprimerMatierePremiere(index: number) {
    this.matieresPremieres.splice(index, 1);
  }
  getProduitsConso(): void{
    this.mesService.getProduitConso().subscribe((data: any[]) => {
      this.produits = data;
    });
  }
  
  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
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
