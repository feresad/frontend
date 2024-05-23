import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Consommationn } from '../../../consommationn';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';
import { QuantiteConso } from '../../../quantite-conso';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-consommation',
  templateUrl: './ajout-consommation.component.html',
  styleUrl: './ajout-consommation.component.css'
})
export class AjoutConsommationComponent implements OnInit{
  username: String = '';
  Consommation : Consommationn = new Consommationn();
  produitFini: Produit[] = [];
  produitConso: Produit[] = [];
  machines: Machine[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  role: string = '';
  consommationForm: FormGroup;
  constructor(private mesService: mesService, private router : Router,private fb: FormBuilder){
    this.consommationForm = this.fb.group({
      idProduitFini: ['', Validators.required],
      idMachine: ['', Validators.required],
      quantiteMatiereConso: this.fb.array([], Validators.required)
    });
  }
  ngOnInit(): void {
    this.getProduitsFini();
    this.getMachinesList();
    this.getProduitConso();
    this.username = localStorage.getItem('username') || '';
  }
  get quantiteMatiereConso() {
    return this.consommationForm.get('quantiteMatiereConso') as FormArray;
  }
  ajoutConsommation(): void {
    if(this.consommationForm.invalid)
      {
        this.errorMessage = 'Veuillez remplir tous les champs';
        return;
      }
    if (this.consommationForm.valid) {
      this.Consommation.idProduitFini = this.consommationForm.get('idProduitFini')?.value;
      this.Consommation.idMachine = this.consommationForm.get('idMachine')?.value;
      this.Consommation.quantiteMatiereConso = this.quantiteMatiereConso.controls.map(control => {
        return {
          nomMatiere: control.get('nomMatiere')?.value,
          quantite: control.get('quantite')?.value
        };
      });
    this.mesService.ajoutConsommation(this.Consommation).subscribe({
      next: (data) => {
        this.successMessage = 'Consommation ajoutée avec succès';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout de la consommation';
      }
    });}
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
  ajouterQuantiteMatiereConso() {
    this.quantiteMatiereConso.push(this.fb.group({
      nomMatiere: ['', Validators.required],
      quantite: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  supprimerQuantiteMatiereConso(index: number) {
    this.quantiteMatiereConso.removeAt(index);
  }
  getProduitConso():void{
    this.mesService.getProduitConso().subscribe({
      next: (data) => {
        this.produitConso = data;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des produits consommables';
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
