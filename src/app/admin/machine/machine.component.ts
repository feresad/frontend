import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../messervice';


@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent implements OnInit{
  username: String = '';
  role: string = '';
  constructor(private mesService: mesService, private router :Router) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('roles') || '';
  }
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
