import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../messervice';
import { Users } from '../../users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../role';

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
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  oldusername: string = '';
  user: Users = {
    username: '',
    email: '',
    password: '',
    role: Role,
  };
  constructor(private mesService: mesService, private router :Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
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
    this.oldusername = this.username;
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    const userUpdate: Users = {
      ...this.user,
      password: this.password,
    };
    if (this.password && this.password.trim() !== '') {
      userUpdate.password = this.password;
    }

    this.mesService.updateUser(this.oldusername, userUpdate).subscribe({
      next: () => {
        this.successMessage = "Utilisateur mis à jour avec succès";
        this.username = userUpdate.username;
      },
      error: (error: any) => {
          this.errorMessage = "Erreur lors de la mise à jour de l'utilisateur";
      },
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