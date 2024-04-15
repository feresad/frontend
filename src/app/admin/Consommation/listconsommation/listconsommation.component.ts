import { Component, OnInit } from '@angular/core';
import { Consommationn } from '../../../consommationn';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Machine } from '../../../machine';
import { Produit } from '../../../produit';

@Component({
  selector: 'app-listconsommation',
  templateUrl: './listconsommation.component.html',
  styleUrl: './listconsommation.component.css'
})
export class ListconsommationComponent implements OnInit{
  conso : Consommationn[] = [];
  username : String = '';
  role: string = '';

  constructor(private mesService : mesService, private router: Router) { }
  ngOnInit(){
    this.getConsommationsList();
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('roles') || '';
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

 // Dans le composant consommation.component.ts
 searchConsommationsByMachineName(event: Event): void {
  const target = event.target as HTMLInputElement;
  const machineName = target.value;
  if (machineName.trim()) {
      this.mesService.getMachinesByName(machineName).subscribe((machines: Machine[]) => {
          machines.forEach(machine => {
              this.mesService.getConsommationsByMachineId(machine.id).subscribe((data: Consommationn[]) => {
                  data.forEach((element) => {
                      this.mesService.getMachineDetails(element.idMachine).subscribe((data: Machine) => {
                          element.nomMachine = data.name;
                      });
                      this.mesService.getProduit(element.idProduit).subscribe((data: Produit) => {
                          element.nomProduit = data.name;
                      });
                  });
                  this.conso = data;
              });
          });
      });
  } else {
      
      this.getConsommationsList();
  }
}
isAdmin(): boolean {
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  return roles.includes('ADMIN');
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
