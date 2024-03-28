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
       
        const roles = data.roles; // Assurez-vous que cela correspond à la structure de votre réponse
        localStorage.setItem('roles', JSON.stringify(roles));
  
        // Redirection si authentifie vers dash et si non rester dans login
        
        if (roles == "ADMIN") {
          this.router.navigate(['/dash']);
        } else if (roles == "USER") {
          this.router.navigate(['/user']);
        } else {
          // Gérez les cas où aucun rôle connu n'est trouvé
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.errorMessage = "Login failed. Please check your credentials.";
        console.error('Login error');
      }
    });
  }
  
}
