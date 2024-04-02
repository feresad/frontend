import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  constructor(private mesService: mesService,private route: ActivatedRoute,private router : Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getMachineDetails(id);
    });
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
    this.mesService.editMachine(this.machine.id, this.machine)
      .subscribe(data => {
        console.log(data);
        this.successMessage = "Machine modifiée avec succès !";
        this.errorMessage = '';
      }, error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.successMessage = 'Error lors de la modification de la machine';
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
