import { Component } from '@angular/core';
import { Produit } from '../../produit';
import { mesService } from '../../messervice';
import { RouterModule } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [RouterModule,
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {
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
