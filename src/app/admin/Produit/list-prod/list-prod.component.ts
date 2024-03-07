import { Component } from '@angular/core';
import { Produit } from '../../../produit';
import { mesService } from '../../../messervice';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-prod',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './list-prod.component.html',
  styleUrl: './list-prod.component.css'
})
export class ListProdComponent {
  produits: Produit[]= [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private mesService: mesService) { }
ngOnInit(){
this.getProduitsList();
}
  getProduitsList(): void{
    this.mesService.getProduitsList().subscribe((data: any[]) => {
      this.produits = data;
    });
  }

  deleteProduit(id: number): void {
    this.mesService.deleteProduit(id).subscribe((data: any) => {
      console.log(data);
      this.successMessage = 'Produit supprimé avec succès !';
      this.errorMessage = '';
      this.getProduitsList();
    }, (error) => {
      console.error(error);
      this.errorMessage = 'Erreur lors de la suppression du produit.';
      this.successMessage = '';
    });
  }
  }
