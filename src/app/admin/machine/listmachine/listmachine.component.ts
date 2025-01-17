import { Component } from '@angular/core';
import { Machine } from '../../../machine';
import { mesService } from '../../../messervice';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Panne } from '../../../panne';

@Component({
  selector: 'app-listmachine',
  templateUrl: './listmachine.component.html',
  styleUrl: './listmachine.component.css'
})
export class ListmachineComponent {
  machines: Machine[]=[];
  //recherche machine par etat 
  etat: string = '';
  username: String = '';
  role: string = '';
  pannes: Panne[] =[];
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private mesService: mesService , private router : Router) { }

  ngOnInit(){
    this.getMachinesList();
    this.username = localStorage.getItem('username') || '';
  }
  getMachinesList(): void{
    this.mesService.getMachinesList().subscribe((data: any[]) => {
      this.machines = data;
    });
  }
  deleteMachine(id: number){
    this.mesService.deleteMachine(id).subscribe((data: any) => {
      this.getMachinesList();
      this.successMessage = 'Machine supprimée avec succès';
    },
    (error) =>{
      this.errorMessage = 'Erreur lors de la suppression de la machine';
    }
  );
  }
  SearchMachineByEtat() {
    if (this.etat.trim() !== '') {
      const filteredMachines = this.machines.filter(machine => {
        // Vérifier si la machine correspond à l'état saisi
        console.log('en panne');
        if (this.etat.toLowerCase() === 'en panne') {
          return !machine.etat; // Retourne les machines en panne (état false)
        } else if (this.etat.toLowerCase() === 'en marche') {
          return machine.etat; // Retourne les machines en marche (état true)
        } else {
          return true; // Retourne toutes les machines si l'état saisi n'est ni 'en panne' ni 'en marche'
        }
      });
      // Mettre à jour la liste des machines avec les machines filtrées
      this.machines = filteredMachines;
    } else {
      // Réinitialiser la liste des machines si l'input est vide
      this.getMachinesList();
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
