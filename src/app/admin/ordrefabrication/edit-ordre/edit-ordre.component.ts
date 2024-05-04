import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';
import { OrdreFabrication } from '../../../ordre-fabrication';

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

  constructor(private mesService: mesService, private router :Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('roles') || '';
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
        this.Ordre = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'ordre de fabrication', error);
      }
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
    this.mesService.modifierOrdreFabrication(this.Ordre.id, this.Ordre).subscribe({
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
