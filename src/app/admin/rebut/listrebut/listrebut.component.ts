import { Component, OnInit } from '@angular/core';
import { Rebut } from '../../../rebut';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Produit } from '../../../produit';
import { Machine } from '../../../machine';

@Component({
  selector: 'app-listrebut',
  templateUrl: './listrebut.component.html',
  styleUrl: './listrebut.component.css'
})
export class ListrebutComponent implements OnInit{
  rebut: Rebut[] = [];
  username: String = '';
  role: string = '';
  searchTerm: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private mesService : mesService,private router : Router) { }

  ngOnInit() {
  this.getRebutList();
  this.username = localStorage.getItem('username') || '';
  }

  getRebutList(){
    // call the service method getRebutList() and subscribe to the response
    this.mesService.getRebutList().subscribe((data: Rebut[])=>{
      this.rebut = data;
      this.rebut.forEach((element) => {
        this.mesService.getProduit(element.idProduitFini).subscribe((data: Produit) => {
          element.nomproduit = data.name;
        });
        this.mesService.getMachineDetails(element.idMachine).subscribe((data: Machine) => {
          element.nomMachine = data.name;
        });
      });
    });
  }
  deleteRebut(id: number): void {
    this.mesService.deleteRebut(id).subscribe((data: any) => {
      console.log(data);
      this.getRebutList();
      this.successMessage = 'Rebut supprimé avec succès';
    }, (error) => {
      this.errorMessage = 'Erreur lors de la suppression du rebut';
    });
  }
  searchRebutByProduitName(event: Event): void {
    const target = event.target as HTMLInputElement;
    const ProduitName = target.value;
    if (ProduitName.trim()) {
        this.mesService.SearchProduit(ProduitName).subscribe((produits: Produit[]) => {
            produits.forEach(produits => {
                this.mesService.getRebutByProduitFini(produits.id).subscribe((data: Rebut[]) => {
                    data.forEach((element) => {
                        this.mesService.getMachineDetails(element.idMachine).subscribe((data: Machine) => {
                            element.nomMachine = data.name;
                        });
                        this.mesService.getProduit(element.idProduitFini).subscribe((data: Produit) => {
                            element.nomproduit = data.name;
                        });
                    });
                    this.rebut = data;
                });
            });
        });
    } else {
        
        this.getRebutList();
    }
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
