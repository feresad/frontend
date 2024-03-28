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
  showModal: boolean = false;
  userToEdit: number = 0;
  newPassword: string = '';
  confirmPassword: string = '';
  username: String = '';

  constructor(private mesService: mesService, private router: Router) {}

  
  ngOnInit(): void {
    this.loadUsers();
    this.username = localStorage.getItem('username') || '';
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
 
  openModal(user: any): void {
    this.showModal = true;
    this.userToEdit = user.id;
  }

  closeModal(): void {
    this.showModal = false;
    this.userToEdit = 0;
    this.newPassword = '';
    this.confirmPassword = '';
    if (this.newPassword !== this.confirmPassword) {
      // Gérer l'erreur de confirmation de mot de passe
      return;
    }
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      // Ici, vous pourriez vouloir afficher une alerte à l'utilisateur ou un message dans l'interface
      return;
    }
    
    this.mesService.changePassword(this.userToEdit, this.newPassword).subscribe({
      next: (data) => {
        console.log("Mot de passe modifié avec succès", data);
        this.loadUsers(); // Recharger la liste des utilisateurs si nécessaire
        this.closeModal(); // Fermer le modal après la mise à jour
      },
      error: (error) => {
        console.error('Erreur lors de la modification du mot de passe', error);
        // Ici aussi, considérez d'afficher un feedback à l'utilisateur
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
