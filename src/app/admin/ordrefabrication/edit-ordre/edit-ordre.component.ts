import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';
import { OrdreFabrication } from '../../../ordre-fabrication';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-ordre',
  templateUrl: './edit-ordre.component.html',
  styleUrl: './edit-ordre.component.css'
})
export class EditOrdreComponent implements OnInit{
  username: String = '';
  role: string = '';
  produits: Produit[] = [];
  machines: Machine[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  Ordre: OrdreFabrication = new OrdreFabrication();
  ordreForm: FormGroup;

  constructor(private mesService: mesService, private router :Router,private route: ActivatedRoute,private fb : FormBuilder) {
    this.ordreForm = this.fb.group({
      idProduitFini: ['', Validators.required],
      idmachine: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', [Validators.required, dateFinValidator('dateDebut')]],
      quantite: ['', [Validators.required, Validators.min(1)]],
      quantiteRebut: [0, [Validators.required, Validators.min(0)]],
      etat: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.route.params.subscribe(params => {
      const id = params['id'];
     this.getOrdreFabricationById(id);
    });
    this.getListProduitFini();
    this.getMachineList();
  }
  getOrdreFabricationById(id: number): void {
    this.mesService.getOrdreFabricationById(id).subscribe({
      next: (data) => {
        this.ordreForm.patchValue(data);
        this.Ordre = data;
      },
    });
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

  modifierOrdre(): void {
    if (this.ordreForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }
    this.mesService.modifierOrdreFabrication(this.Ordre.id, this.ordreForm.value).subscribe({
      next: (data) => {
        this.successMessage = 'Ordre modifié avec succès';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la modification de l\'ordre';
        console.error('Modifier ordre error', error);
      }
    });
  }
  onSubmit() {
    this.modifierOrdre();
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

    // Set the time to 00:00:00 for correct date comparison
    dateDebutDate.setHours(0, 0, 0, 0);
    dateFinDate.setHours(0, 0, 0, 0);

    if (dateFinDate < dateDebutDate) {
      return { invalidEndDate: true };
    }
    return null;
  };
}