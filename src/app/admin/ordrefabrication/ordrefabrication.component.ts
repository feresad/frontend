import { Component } from '@angular/core';
import { mesService } from '../../messervice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordrefabrication',
  templateUrl: './ordrefabrication.component.html',
  styleUrl: './ordrefabrication.component.css'
})
export class OrdrefabricationComponent {

  username: String = '';
  role: string = '';
  constructor(private mesService: mesService, private router :Router) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
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
