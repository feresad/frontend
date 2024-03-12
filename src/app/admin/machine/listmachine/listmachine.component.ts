import { Component } from '@angular/core';
import { Machine } from '../../../machine';
import { mesService } from '../../../messervice';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listmachine',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './listmachine.component.html',
  styleUrl: './listmachine.component.css'
})
export class ListmachineComponent {
  machines: Machine[]=[];
  //recherche machine par etat 
  etat: string = '';
  constructor(private mesService: mesService) { }

  ngOnInit(){
    this.getMachinesList();
  }
  getMachinesList(): void{
    this.mesService.getMachinesList().subscribe((data: any[]) => {
      this.machines = data;
    });
  }
  deleteMachine(id: number){
    this.mesService.deleteMachine(id).subscribe((data: any) => {
      this.getMachinesList();
    });
  }
  SearchMachineByEtat() {
    if (this.etat.trim() !== '') {
      const filteredMachines = this.machines.filter(machine => {
        // Vérifier si la machine correspond à l'état saisi
        if (this.etat.toLowerCase() === 'en panne') {
          return !machine.etat; // Retourne les machines en panne (état false)
        } else if (this.etat.toLowerCase() === 'en marche') {
          return machine.etat; // Retourne les machines en marche (état true)
        } else {
          return true; // Retourne toutes les machines si l'état saisi n'est ni 'en panne' ni 'en marche'
        }
      });
      // Mettre à jour la liste des machines avec les machines filtrées
      this.machines = filteredMachines;
    } else {
      // Réinitialiser la liste des machines si l'input est vide
      this.getMachinesList();
    }
  }


}
