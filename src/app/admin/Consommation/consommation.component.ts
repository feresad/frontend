import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Consommationn } from '../../consommationn';
import { mesService } from '../../messervice';
import { Machine } from '../../machine';
import { Produit } from '../../produit';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consommation',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './consommation.component.html',
  styleUrl: './consommation.component.css'
})
export class ConsommationComponent implements OnInit{
  conso : Consommationn[] = [];


  constructor(private mesService : mesService) { }
  ngOnInit(){
    this.getConsommationsList();
  }
  getConsommationsList(): void {
    this.mesService.getConsommationsList().subscribe((data: Consommationn[]) => {
      this.conso= data;
      this.conso.forEach((element) => {
        // affecter les details du getMachineDetails to an array
        this.mesService.getMachineDetails(element.idMachine).subscribe((data: Machine) => {
          element.nomMachine = data.name;
        });
        this.mesService.getProduit(element.idProduit).subscribe((data: Produit) => {
          element.nomProduit = data.name;
        });
      })
    });
  }



}