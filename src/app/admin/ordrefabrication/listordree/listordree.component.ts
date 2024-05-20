import { Component } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { OrdreFabrication } from '../../../ordre-fabrication';


@Component({
  selector: 'app-listordree',
  templateUrl: './listordree.component.html',
  styleUrl: './listordree.component.css'
})
export class ListordreeComponent {
  username: String = '';
  role: string = '';
  ordres: OrdreFabrication[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private mesService: mesService, private router :Router) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.getOrdreFabrication();
  }

  getOrdreFabrication(): void {
    this.mesService.getOrdresFabrication().subscribe({
      next: (data) => {
        this.ordres = data;
        this.ordres.forEach((ordre) => {
          this.mesService.getMachineDetails(ordre.idmachine).subscribe({
            next: (machine) => {
              ordre.nomMachine = machine.name;
            }
        });
        this.mesService.getProduit(ordre.idProduitFini).subscribe({
          next: (produit) => {
            ordre.nomProduit = produit.name;
          }
      });
      },
    )},
     error: (error) => {
      this.errorMessage = 'Erreur lors de la récupération des ordres';
    }
    });
  }
  deleteOrdre(id: number): void {
    this.mesService.deleteOrdreFabrication(id).subscribe({
      next: (data) => {
        this.getOrdreFabrication();
        this.successMessage = 'Ordre supprimé avec succès';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la suppression de l\'ordre';
      }
    });
  }
  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('role') || '[]');
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
