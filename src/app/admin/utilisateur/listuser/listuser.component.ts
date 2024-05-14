import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Router } from '@angular/router';
import { Users } from '../../../users';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit{
  users: Users[] = [];
  user: Users = new Users();
  showModal: boolean = false;
  userToEdit: any;
  newPassword: string = '';
  confirmPassword: string = '';
  username: String = '';
  sucessMessage: string = '';
  errorMessage: string = '';
  searchQuery: string = '';
  changePasswordForm!: FormGroup;

  constructor(private mesService: mesService, private router: Router,private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  ngOnInit(): void {
    this.loadUsers();
    this.username = this.mesService.getUsernameFromToken();
  }
// delete user by id
  deleteUser(id: any): void {
    this.mesService.deleteUser(id).subscribe({
      next: (data) => {
        this.sucessMessage = 'Utilisateur supprimé avec succès';
        this.loadUsers();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la suppression de l\'utilisateur';
      }
    });
  }
 
  openModal(user: Users): void {
    this.showModal = true;
    this.userToEdit = user.id;
    this.user = user;
    console.log(user);
    console.log(this.userToEdit);
  }

  

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs du formulaire";
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas";
      return;
    }
    this.mesService.changePassword(this.userToEdit, this.newPassword).subscribe({
        next: () => {
            this.sucessMessage = "Mot de passe modifié avec succès";
            this.loadUsers();
            this.closeModal();
        },
        error: (error) => {
            this.errorMessage = "Erreur lors de la modification du mot de passe";
        },
    });
}
closeModal(): void {
  this.showModal = false;
  this.userToEdit = 0;
  this.newPassword = '';
  this.confirmPassword = '';
}

  loadUsers(): void {
    this.mesService.getUsersList().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    });
  }
  SearchUsers(): void {
    if (this.searchQuery.trim() !== '') {
      const searchValue = this.searchQuery.toLowerCase();
      const filteredUsers = this.users.filter(users => {
        const lowercaseName = users.username.toLowerCase();
        return lowercaseName.includes(searchValue);
      });
      this.users = filteredUsers;
    } else {
      this.loadUsers();
    }
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
