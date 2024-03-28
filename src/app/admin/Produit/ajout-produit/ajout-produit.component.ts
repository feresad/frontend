import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../../messervice';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ajoutproduit',
    templateUrl: './ajout-produit.component.html',
    styleUrls: ['./ajout-produit.component.css'],
})
export class AjoutproduitComponent implements OnInit {
  produit: Produit = new Produit();
  successMessage: string = '';
  errorMessage: string = '';
  username: String = '';
  
  constructor(private mesService: mesService, private router : Router){}

  ngOnInit():void{
    this.username = localStorage.getItem('username') || '';
  }
  ajouterProduit(): void {
    this.mesService.ajouterProduit(this.produit)
      .subscribe(
        (data) => {
          this.successMessage = 'Produit ajouté avec succès.';
          this.errorMessage = ''; // Assurez-vous que le message d'erreur est vide en cas de succès
          // Réinitialisez le formulaire ou effectuez toute autre action nécessaire
          this.produit.etat = 0;
          this.produit = new Produit();
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Erreur lors de l\'ajout du produit.';
          this.successMessage = ''; // Assurez-vous que le message de succès est vide en cas d'erreur
        }
      );
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
