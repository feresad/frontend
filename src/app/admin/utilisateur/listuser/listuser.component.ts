import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Users } from '../../../users';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit{
  users: Users[] = [];

  constructor(private mesService: mesService, private router: Router) {}

  
  ngOnInit(): void {
    this.loadUsers();
  }
// delete user by id
  deleteUser(id: any): void {
    this.mesService.deleteUser(id).subscribe({
      next: (data) => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    });
  }
 
  loadUsers(): void {
    this.mesService.getUsersList().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    });
  }
  
  logout(): void {
    this.mesService.logout().subscribe({
      next: (data) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
}

}
