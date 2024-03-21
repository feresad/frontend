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
        console.log(data);
        // Exemple de stockage de rôles dans localStorage
        // Assurez-vous que votre API renvoie les rôles de cette manière ou ajustez en conséquence
        const roles = data.roles; // Assurez-vous que cela correspond à la structure de votre réponse
        localStorage.setItem('roles', JSON.stringify(roles));
  
        // Redirection basée sur le rôle
        if (roles == "ADMIN") {
          this.router.navigate(['/dashadmin']);
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
