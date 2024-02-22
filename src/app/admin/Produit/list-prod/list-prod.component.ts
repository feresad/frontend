import { Component } from '@angular/core';
import { Produit } from '../../../produit';
import { mesService } from '../../../messervice';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-prod',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-prod.component.html',
  styleUrl: './list-prod.component.css'
})
export class ListProdComponent {
  produits: Produit[]= [];

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
      this.getProduitsList();
    });
  }

}
