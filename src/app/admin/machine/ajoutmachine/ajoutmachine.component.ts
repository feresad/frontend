import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajoutmachine',
  templateUrl: './ajoutmachine.component.html',
  styleUrl: './ajoutmachine.component.css'
})
export class AjoutmachineComponent implements OnInit{
  machine: Machine = new Machine();
  successMessage: string = '';
  errorMessage: string = '';
  username: String = '';
  role: string = '';
  machineForm: FormGroup;
  constructor(private fb: FormBuilder,private mesService: mesService, private router : Router) {
    this.machineForm = this.fb.group({
      name: ['', Validators.required], // Le nom de la machine est obligatoire
    });
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('roles') || '';
  }
  ajouterMachine(): void {
    if (this.machineForm.valid) { // Ne soumettez que si le formulaire est valide
      const machineData = this.machineForm.value; // Obtenez les valeurs du formulaire
      this.mesService.ajouterMachine(machineData).subscribe(
        (data) => {
          this.successMessage = 'L\'ajout de la machine a été effectué avec succès. La machine est maintenant en état de marche.';
          this.machineForm.reset(); // Réinitialisation du formulaire après succès
        },
        (error) => {
          this.errorMessage = 'Echec de l\'ajout de la machine.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
    }
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
