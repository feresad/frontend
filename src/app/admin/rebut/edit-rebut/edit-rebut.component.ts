import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';
import { Rebut } from '../../../rebut';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-rebut',
  templateUrl: './edit-rebut.component.html',
  styleUrl: './edit-rebut.component.css'
})
export class EditRebutComponent implements OnInit{
  username : string = '';
  rebut: Rebut = new Rebut();
  produits: Produit[] = [];
  machines: Machine[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  rebutForm: FormGroup;
  constructor(private mesService : mesService, private route: ActivatedRoute,private router: Router,private fb: FormBuilder) { 
    this.rebutForm = this.fb.group({
      quantite: ['', [Validators.required, Validators.min(1)]],
      idProduitFini: ['', Validators.required],
      idMachine: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getRebutDetails(id);
    });
    this.getMachinesList();
    this.getProduitsFini();
  }
  
  getRebutDetails(id: number): void {
    this.mesService.getRebut(id).subscribe((data: Rebut) => {
      this.rebutForm.patchValue(data);
      this.rebut = data;
    });
  }
  getProduitsFini(): void {
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
  editRebut(): void {
    if (this.rebutForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }
    this.mesService.editRebut(this.rebut.id, this.rebutForm.value).subscribe({
      next: (data: Rebut) => {
        this.successMessage = 'Rebut modifié avec succès.';
      },
      error: (error: any) => {
        this.errorMessage = 'Erreur lors de la modification du rebut.';
        console.error('Edit rebut error', error);
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
