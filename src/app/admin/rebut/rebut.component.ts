import { Component, OnInit } from '@angular/core';
import { mesService } from '../../messervice';
import { Rebut } from '../../rebut';
import { CommonModule } from '@angular/common';
import { Produit } from '../../produit';
import { Machine } from '../../machine';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rebut',
  templateUrl: './rebut.component.html',
  styleUrl: './rebut.component.css'
})
export class RebutComponent implements OnInit{
  username: String = '';
  role: string = '';
  constructor(private mesService : mesService,private router : Router) { }

  ngOnInit() {
  this.username = this.mesService.getUsernameFromToken();
  this.role = localStorage.getItem('roles') || '';
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
