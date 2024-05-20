import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mesService } from '../../../messervice';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './editproduit.component.html',
  styleUrl: './editproduit.component.css'
})
export class EditProduitComponent implements OnInit {
  produit: Produit = new Produit();
  username: String = '';
  role: string = '';
  typeProduit: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  produits: Produit[] = [];
  
  constructor(private mesService : mesService, private route: ActivatedRoute, private router : Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getProduitDetails(id);
    });
    this.username = localStorage.getItem('username') || '';
    this.getProduitsConso();
  }
  getProduitDetails(id: number): void {
    this.mesService.getProduit(id).subscribe((data: Produit) => {
      this.produit = data;
      if (this.produit.etat === undefined) { 
        this.typeProduit = 'Consommable';
    } else if (this.produit.etat >= 0 && this.produit.etat <= 2) {
        this.typeProduit = 'Fini';
    } else {
    }
      console.log(this.produit);
    });
  }

  editProduitFini(): void {
    this.produit.name = this.produit.name.toLowerCase();
    this.mesService.editProduitFinis(this.produit.id, this.produit)
    .subscribe({
        next: (data: Produit) => {
          console.log(data);
            this.successMessage = 'Produit modifié avec succès.';
        },
        error: (error: HttpErrorResponse) => {
            this.errorMessage = 'Erreur lors de la modification du produit.';
        }
    });
}
  editProduitConso(): void {
    this.produit.name = this.produit.name.toLowerCase();
    this.mesService.editProduitConso(this.produit.id, this.produit)
    .subscribe((data: Produit) => {
      this.successMessage = 'Produit modifié avec succès.';
      },
      (error : any) => this.errorMessage = 'Erreur lors de la modification du produit.');
  }
  onSubmit() {
    if(this.typeProduit === 'Fini')
      {
        this.editProduitFini();
      }
      else
      {
        this.editProduitConso();
      }
  }
  getProduitsConso(): void{
    this.mesService.getProduitConso().subscribe((data: any[]) => {
      this.produits = data;
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
