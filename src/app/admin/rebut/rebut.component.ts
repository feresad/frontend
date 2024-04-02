import { Component, OnInit } from '@angular/core';
import { mesService } from '../../messervice';
import { Rebut } from '../../rebut';
import { CommonModule } from '@angular/common';
import { Produit } from '../../produit';
import { Machine } from '../../machine';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rebut',
  templateUrl: './rebut.component.html',
  styleUrl: './rebut.component.css'
})
export class RebutComponent implements OnInit{
  // declare rebut as an array of Rebut
  rebut: Rebut[] = [];
  username: String = '';
  role: string = '';
  constructor(private mesService : mesService,private router : Router) { }

  ngOnInit() {
  this.getRebutList();
  this.username = localStorage.getItem('username') || '';
  this.role = localStorage.getItem('roles') || '';
  }

  getRebutList(){
    // call the service method getRebutList() and subscribe to the response
    this.mesService.getRebutList().subscribe((data: Rebut[])=>{
      this.rebut = data;
      this.rebut.forEach((element) => {
        this.mesService.getProduit(element.idProduit).subscribe((data: Produit) => {
          element.nomproduit = data.name;
        });
        this.mesService.getMachineDetails(element.idMachine).subscribe((data: Machine) => {
          element.nomMachine = data.name;
        });
      });
    });
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
