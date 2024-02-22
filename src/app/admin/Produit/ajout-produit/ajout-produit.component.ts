import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mesService } from '../../../messervice';

@Component({
  selector: 'app-ajoutproduit',
  standalone: true,
  imports: [FormsModule],
  providers: [mesService],
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutproduitComponent implements OnInit {
  produit: Produit = new Produit();

  constructor(private mesService: mesService){}

  ngOnInit():void{
    
  }
  ajouterProduit(): void {
    this.mesService.ajouterProduit(this.produit)
      .subscribe(data => {
        console.log(data);
      },
      error => console.log(error));
  }
}
