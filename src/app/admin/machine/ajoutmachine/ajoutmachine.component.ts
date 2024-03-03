import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajoutmachine',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './ajoutmachine.component.html',
  styleUrl: './ajoutmachine.component.css'
})
export class AjoutmachineComponent implements OnInit{
  machine: Machine = new Machine();
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private mesService: mesService) {}
  ngOnInit(): void {
    
  }
  ajouterMachine(): void {
    this.mesService.ajouterMachine(this.machine).subscribe((data: any) => {
      this.successMessage = 'L\'ajout de la machine a été effectué avec succès. La machine est maintenant en état de marche.';
      this.errorMessage = '';
    },
    (error: any) => {
      this.errorMessage = 'Echec de l\'ajout de la machine';
      this.successMessage = '';
    });
  }
}
