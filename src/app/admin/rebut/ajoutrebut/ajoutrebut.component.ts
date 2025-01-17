import { Component, OnInit } from '@angular/core';
import { Rebut } from '../../../rebut';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajoutrebut',
  templateUrl: './ajoutrebut.component.html',
  styleUrl: './ajoutrebut.component.css'
})
export class AjoutrebutComponent implements OnInit{
  rebut: Rebut = new Rebut();
  produits: Produit[] = [];
  machines: Machine[] = [];
  username: String = '';
  role: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  rebutForm: FormGroup;
  constructor(private mesService : mesService,private router : Router,private fb:FormBuilder) { 
    this.rebutForm = this.fb.group({
      quantite: ['', [Validators.required, Validators.min(1)]],
      idProduitFini: ['', Validators.required],
      idMachine: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
  this.getProduitsList();
  this.getMachinesList();
  }
  //ajout rebut
  ajoutRebut(): void {
    if (this.rebutForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }
    this.mesService.addRebut(this.rebutForm.value).subscribe({
      next: (data: Rebut) => {
        this.successMessage = 'Rebut ajouté avec succès';
        this.rebutForm.reset();
      },
      error: (error: any) => {
        this.errorMessage = 'Erreur lors de l\'ajout du rebut';
        console.error('Ajout rebut error', error);
      }
    });
  }
  getProduitsList(): void {
    this.mesService.getProduitFini().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (error) => {
        console.error('Get produits error', error);
      }
    });
  }
  getMachinesList(): void {
    this.mesService.getMachinesList().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (error) => {
        console.error('Get machines error', error);
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
