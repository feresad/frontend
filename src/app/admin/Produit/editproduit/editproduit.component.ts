import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  produitForm: FormGroup;
  
  constructor(private mesService : mesService, private route: ActivatedRoute, private router : Router,private fb: FormBuilder) { 
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      etat: [''],
      matieresPremieres: this.fb.array([])
    });
  }
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
      if (this.produit.etat >= 0 && this.produit.etat <= 2) {
        this.typeProduit = 'Fini';
        console.log(this.typeProduit);
      } else {
        this.typeProduit = 'Consommable';
        console.log(this.typeProduit);
      }
      this.produitForm.patchValue({
        name: this.produit.name,
        quantite: this.produit.quantite,
        etat: this.produit.etat !== undefined ? this.produit.etat : ''
      });
      // Ajout des validateurs après avoir déterminé le type de produit
      if (this.typeProduit === 'Fini') {
        this.produitForm.get('etat')?.setValidators(Validators.required);
        this.produitForm.get('matieresPremieres')?.setValidators(Validators.required);

        if (this.produit.matieresPremieres) {
          this.produit.matieresPremieres.forEach(matierePremiere => {
            this.matieresPremieresFormArray.push(this.fb.group({
              name: [matierePremiere.name, Validators.required],
              quantite: [matierePremiere.quantite, [Validators.required, Validators.min(0.1)]]
            }));
          });
        }
      }
    });
  }
  get matieresPremieresFormArray(): FormArray {
    return this.produitForm.get('matieresPremieres') as FormArray;
  }
  editProduitFini(): void {
    if (this.produitForm.valid) {
      this.produit.name = this.produitForm.value.name.toLowerCase();
      this.produit.quantite = this.produitForm.value.quantite;
      this.produit.etat = this.produitForm.value.etat;
      this.produit.matieresPremieres = this.produitForm.value.matieresPremieres;
      this.mesService.editProduitFinis(this.produit.id, this.produit)
        .subscribe({
          next: (data: Produit) => {
            this.successMessage = 'Produit modifié avec succès.';
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = 'Erreur lors de la modification du produit.';
          }
        });
    }
  }
  editProduitConso(): void {
    if(this.produitForm.invalid)
      {
        this.errorMessage = 'Veuillez remplir tous les champs.';
        return;
      }
    if (this.produitForm.valid) {
      this.produit.name = this.produitForm.value.name.toLowerCase();
      this.produit.quantite = this.produitForm.value.quantite;
      console.log(this.produit);
      this.mesService.editProduitConso(this.produit.id, this.produit)
        .subscribe({
          next: (data: Produit) => {
            this.successMessage = 'Produit modifié avec succès.';
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = 'Erreur lors de la modification du produit.';
          }
        });
    }
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
  ajouterMatierePremiere() {
    const matierePremiereGroup = this.fb.group({
      name: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(0.1)]]
    });
    this.matieresPremieresFormArray.push(matierePremiereGroup);
  }

  supprimerMatierePremiere(index: number) {
    this.matieresPremieresFormArray.removeAt(index);
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
