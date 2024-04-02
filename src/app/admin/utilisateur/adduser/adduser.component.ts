import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Role } from '../../../role';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit{
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  roles: Role[] = [];
  selectedRole: string = '';
  showPassword: boolean = false;
  usernamenav: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private mesService: mesService, private router: Router) {}

  ngOnInit() {
    this.loadRoles();
    this.usernamenav = localStorage.getItem('username') || '';
  }
  loadRoles(): void {
    this.mesService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des rôles', error);
      }
    });
  }
  addUser(): void {
    if (this.password !== this.confirmPassword) {
      // Gérer l'erreur de confirmation de mot de passe
      return;
    }

    this.mesService.register(this.username, this.email, this.password,[this.selectedRole]).subscribe({
      next: (data) => {
        this.successMessage = 'Utilisateur ajouté avec succès';
      
      },
      error: (error) => {
        this.errorMessage ='Erreur lors de l\'ajout de l\'utilisateur';
      }
    });
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
