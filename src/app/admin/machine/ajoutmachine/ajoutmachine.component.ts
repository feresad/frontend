import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajoutmachine',
  templateUrl: './ajoutmachine.component.html',
  styleUrl: './ajoutmachine.component.css'
})
export class AjoutmachineComponent implements OnInit{
  machine: Machine = new Machine();
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private mesService: mesService, private router : Router) {}
  ngOnInit(): void {
    
  }
  ajouterMachine(): void {
    this.mesService.ajouterMachine(this.machine).subscribe((data: Machine): void => {
      this.successMessage = 'L\'ajout de la machine a été effectué avec succès. La machine est maintenant en état de marche.';
      this.errorMessage = '';
    },
    (error: any) => {
      this.errorMessage = 'Echec de l\'ajout de la machine';
      this.successMessage = '';
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
