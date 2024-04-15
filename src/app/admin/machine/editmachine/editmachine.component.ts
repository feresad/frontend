import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Panne } from '../../../panne';

@Component({
  selector: 'app-editmachine',
  templateUrl: './editmachine.component.html',
  styleUrl: './editmachine.component.css'
})
export class EditmachineComponent implements OnInit{
  machine: Machine = new Machine();
  successMessage: string = '';
  errorMessage: string = '';
  username: String = '';
  role: string = '';
  pannes: Panne[] =[];
  checked: boolean = false;
  constructor(private mesService: mesService,private route: ActivatedRoute,private router : Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getMachineDetails(id);
    });
    this.getPannesList();
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('roles') || '';
  }
  getMachineDetails(id: number) {
    this.mesService.getMachineDetails(id)
      .subscribe(data => {
        console.log(data);
        this.machine = data;
      }, error => console.log(error));
  }
  updateMachine() {
    if (this.checked) { // Si la case est cochée
      this.machine.panneId = null; // Définir panneId sur null
    }
    this.mesService.editMachine(this.machine.id, this.machine)
      .subscribe(data => {
        console.log(data);
        this.successMessage = "Machine modifiée avec succès !";
        this.errorMessage = '';
      }, error => {
        console.log(error);
        this.errorMessage = 'Error lors de la modification de la machine';
      });
  }
 
  getPannesList(): void {
    this.mesService.getPanneList().subscribe({
      next: (data) => {
        this.pannes = data;
      },
      error: (error) => {
        console.error('Get pannes error', error);
      }
    });
  }

  onSubmit() {
    this.updateMachine();
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
