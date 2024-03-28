import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Consommationn } from '../../consommationn';
import { mesService } from '../../messervice';
import { Machine } from '../../machine';
import { Produit } from '../../produit';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrl: './consommation.component.css'
})
export class ConsommationComponent implements OnInit{
  conso : Consommationn[] = [];
  username : String = '';


  constructor(private mesService : mesService, private router: Router) { }
  ngOnInit(){
    this.getConsommationsList();
    this.username = localStorage.getItem('username') || '';
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

  logout(): void {
    this.mesService.logout().subscribe({
      next: (data) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
}

}