import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Role } from '../../../role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  addUserForm: FormGroup;
  constructor(private fb : FormBuilder,private mesService: mesService, private router: Router) {
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

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
    if (this.addUserForm.invalid) {
      // Gérer l'erreur si le formulaire est invalide
      this.errorMessage = "Le formulaire contient des erreurs.";
      return;
    }

    const { username, email, password, confirmPassword, role } = this.addUserForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = "Le mot de passe et la confirmation ne correspondent pas.";
      return;
    }

    this.mesService.register(username, email, password, role).subscribe({
      next: (data) => {
        this.successMessage = 'Utilisateur ajouté avec succès.';
        this.addUserForm.reset(); // Réinitialiser le formulaire
      },
      error: (error) => {
        this.errorMessage = "Erreur lors de l'ajout de l'utilisateur.";
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
