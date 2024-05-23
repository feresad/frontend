import { Component } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Produit } from '../../../produit';
import { OrdreFabrication } from '../../../ordre-fabrication';
import { Machine } from '../../../machine';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
  ordreForm: FormGroup;
  constructor(private mesService: mesService, private router :Router,private fb:FormBuilder) {
    this.ordreForm = this.fb.group({
      idProduitFini: ['', Validators.required],
      idmachine: ['', Validators.required],
      dateDebut: ['', [Validators.required, dateDebutValidator()]],
      dateFin: ['', [Validators.required, dateFinValidator('dateDebut')]],
      quantiteRebut: [0, [Validators.required, Validators.min(0)]],
      etat: ['', Validators.required]
    });
   }
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
    if (this.ordreForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }
    const idProduitFini = this.ordreForm.value.idProduitFini;
    // Obtenez la quantité associée au plan produit
    this.mesService.getProduitFiniById(idProduitFini).subscribe({
      next: (produit) => {
        // Récupérez la quantité totale du plan produit
        this.ordreForm.value.quantite = produit.quantite;

        // Ajoutez l'ordre de fabrication avec la quantité obtenue
        this.mesService.ajoutOrdreFabrication(this.ordreForm.value).subscribe({
          next: (data) => {
            // Message de succès
            this.successMessage = 'Ordre ajouté avec succès';
          },
          error: (error) => {
            // Message d'erreur
            this.errorMessage = 'Erreur lors de l\'ajout de l\'ordre';
          }
        });
      },
      error: (error) => {
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
export function dateDebutValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    // Set the time to 00:00:00 for correct date comparison
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { invalidDate: true };
    }
    return null;
  };
}
export function dateFinValidator(dateDebutControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    const dateDebut = control.parent.get(dateDebutControlName)?.value;
    const dateFin = control.value;

    if (!dateDebut || !dateFin) {
      return null;
    }

    const dateDebutDate = new Date(dateDebut);
    const dateFinDate = new Date(dateFin);

    dateDebutDate.setHours(0, 0, 0, 0);
    dateFinDate.setHours(0, 0, 0, 0);

    if (dateFinDate < dateDebutDate) {
      return { invalidEndDate: true };
    }
    return null;
  };
}