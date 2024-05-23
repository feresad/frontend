import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../../produit';
import { Consommationn } from '../../../consommationn';
import { Machine } from '../../../machine';
import { QuantiteConso } from '../../../quantite-conso';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editconso',
  templateUrl: './editconso.component.html',
  styleUrl: './editconso.component.css'
})
export class EditconsoComponent implements OnInit{

  username: String = '';
  successMessage: string = '';
  errorMessage: string = '';
  conso: Consommationn = new Consommationn();
  produitFini: Produit[] = [];
  machines : Machine [] = [];
  produitConso: Produit[] = [];
  consommationForm: FormGroup;

  constructor(private mesService: mesService, private router : Router, private route: ActivatedRoute,private fb : FormBuilder) { 
    this.consommationForm = this.fb.group({
      idProduitFini: ['', Validators.required],
      idMachine: ['', Validators.required],
      quantiteMatiereConso: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getConsommationById(id);
    });
    this.getProduitsFini();
    this.getMachinesList();
    this.getPrdouitConso();
    this.username = localStorage.getItem('username') || '';

  }
  get quantiteMatiereConso(): FormArray {
    return this.consommationForm.get('quantiteMatiereConso') as FormArray;
  }
  ajouterQuantiteMatiereConso(nomMatiere = '', quantite = 0): void {
    this.quantiteMatiereConso.push(this.fb.group({
      nomMatiere: [nomMatiere, Validators.required],
      quantite: [quantite, [Validators.required, Validators.min(1)]]
    }));
  }

  supprimerQuantiteMatiereConso(index: number): void {
    this.quantiteMatiereConso.removeAt(index);
  }
  getProduitsFini(): void {
    this.mesService.getProduitFini().subscribe({
      next: (data) => {
        this.produitFini = data;
      },
      error: (error) => {
       this.errorMessage = 'Erreur lors de la récupération des produits finis';
      }
    });
  }
  getMachinesList(): void {
    this.mesService.getMachinesList().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des machines';
      }
    });
  }
  getPrdouitConso(): void {
    this.mesService.getProduitConso().subscribe({
      next: (data) => {
        this.produitConso = data;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des produits consommables';
      }
    });
  }
  getConsommationById(id: number): void {
    this.mesService.getConsommation(id).subscribe({
      next: (data) => {
        this.conso = data;
        this.consommationForm.patchValue({
          idProduitFini: this.conso.idProduitFini,
          idMachine: this.conso.idMachine
        });
        data.quantiteMatiereConso.forEach((matiere: QuantiteConso) => {
          this.ajouterQuantiteMatiereConso(matiere.nomMatiere, matiere.quantite);
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la consommation', error);
      }
    });
  }
  editConsommation(): void {
    if (this.consommationForm.valid) {
    this.mesService.editConsommation(this.conso.id, this.conso).subscribe({
      next: (data) => {
        this.successMessage = 'Consommation modifiée avec succès';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la modification de la consommation';
      }
    });
  }
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
