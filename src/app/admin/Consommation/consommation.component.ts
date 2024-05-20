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
  role: string = '';

  constructor(private mesService : mesService, private router: Router) { }
  ngOnInit(){
    this.username = localStorage.getItem('username') || '';
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