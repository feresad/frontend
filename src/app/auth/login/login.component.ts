import { Component } from '@angular/core';
import { mesService } from '../../messervice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private mesService: mesService, private router: Router) {}

  login(): void {
    this.mesService.login(this.username, this.password).subscribe({
      next: (data) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('roles', JSON.stringify(data.roles));
  
        // Redirection vers dash après l'authentification réussie
        this.router.navigate(['/dash']);
      },
      error: (error) => {
        this.errorMessage = "La connexion a échoué. Veuillez vérifier vos informations.";
        console.error('Login error');
      }
    });
  } 
  
}
