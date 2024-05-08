import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../messervice';
import { Users } from '../../users';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.css'
})
export class ParametresComponent implements OnInit{
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  user: Users = {
    username: '',
    email: '',
    password: ''
  };
  constructor(private mesService: mesService, private router :Router) { }

  ngOnInit(): void {
    this.username = this.mesService.getUsernameFromToken();
    this.role = localStorage.getItem('roles') || '';
    this.loadUserInfo();
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword; // Basculer entre true et false
  }
  loadUserInfo(): void {
    const username = localStorage.getItem('username'); // Obtenir le nom d'utilisateur
    if (username) {
      this.mesService.getUserInfo(username).subscribe({
        next: (user: Users) => {
          this.user = user; // Pré-remplir les données de l'utilisateur
        },
        error: (error: any) => {
          this.errorMessage = "Erreur lors de la récupération des informations utilisateur";
          console.error(error);
        },
      });
    }
  }
  updateUser(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    const userUpdate: Users = {
      ...this.user, // Conserver les détails existants
      password: this.password, // Mettre à jour le mot de passe
    };

    this.mesService.updateUser(this.user.username, userUpdate).subscribe({
      next: () => {
        this.successMessage = "Utilisateur mis à jour avec succès";
        console.log(userUpdate);
      },
      error: (error: any) => {
        this.errorMessage = "Erreur lors de la mise à jour de l'utilisateur";
        console.error(error);
      },
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
