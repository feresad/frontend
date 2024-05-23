import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  produitForm: FormGroup;
  
  
  constructor(private mesService: mesService, private router : Router, private fb: FormBuilder){
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      matieresPremieres: this.fb.array([]),
    });
  }

  ngOnInit():void{
    this.username = localStorage.getItem('username') || '';
    this.getProduitsConso();
  }
  ajouterProduitFini(): void {
    if (this.produitForm.valid) {
      this.produit.name = this.produit.name.toLowerCase();
        this.produit.matieresPremieres = this.matieresPremieresFormArray.controls.map(control => {
          return {
            name: control.get('name')?.value,
            quantite: control.get('quantite')?.value
          };
        });
      this.mesService.ajoutProduitFini(this.produit)
        .subscribe(
          (data) => {
            this.successMessage = 'Produit Fini ajouté avec succès.';
            this.produitForm.reset();
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
  }
  ajouterProduitConso(): void {
    if (this.produitForm.valid) {
      this. produit.name = this.produit.name.toLowerCase();
      this.mesService.ajoutProduitConso(this.produit)
        .subscribe(
          (data) => {
            this.successMessage = 'Produit Consommable ajouté avec succès.';
            this.produitForm.reset();
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'Erreur lors de l\'ajout d\'un produit Consommable.';
          }
        );
    }
  }
  ajouterMatierePremiere() {
    const matierePremiereGroup = this.fb.group({
      name: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(0.1)]]
    });
    this.matieresPremieresFormArray.push(matierePremiereGroup);
  }
  get matieresPremieresFormArray(): FormArray {
    return this.produitForm.get('matieresPremieres') as FormArray;
  }

  supprimerMatierePremiere(index: number) {
    this.matieresPremieres.splice(index, 1);
  }
  getProduitsConso(): void{
    this.mesService.getProduitConso().subscribe((data: any[]) => {
      this.produits = data;
    });
  }
  getMatierePremiereFormGroup(index: number): FormGroup {
    const matierePremiereFormArray = this.produitForm.get('matieresPremieres') as FormArray;
    const matierePremiereFormGroup = matierePremiereFormArray.at(index) as FormGroup;
    return matierePremiereFormGroup;
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
