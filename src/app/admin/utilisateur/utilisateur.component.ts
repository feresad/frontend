import { Component, OnInit } from '@angular/core';
import { mesService } from '../../messervice';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit{
  username: String = '';
  ngOnInit(): void {
    this.username = this.mesService.getUsernameFromToken();
  }
  constructor(private mesService: mesService, private router: Router) {}
  
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
