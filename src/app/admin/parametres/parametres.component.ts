import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../messervice';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.css'
})
export class ParametresComponent implements OnInit{
  username: String = '';
  role: String = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('roles') || '';
  }
  constructor(private mesService: mesService, private router :Router) { }

  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes('ROLE_ADMIN');
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
