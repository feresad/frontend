import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Panne } from '../../../panne';

@Component({
  selector: 'app-editmachine',
  templateUrl: './editmachine.component.html',
  styleUrl: './editmachine.component.css'
})
export class EditmachineComponent implements OnInit{
  machine: Machine = new Machine();
  successMessage: string = '';
  errorMessage: string = '';
  username: string = '';
  role: string = '';
  pannes: Panne[] =[];
  checked: boolean = false;
  selectedPannes: number[] = [];
  constructor(private mesService: mesService,private route: ActivatedRoute,private router : Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getMachineDetails(id);
    });
    this.getPannesList();
    this.username = localStorage.getItem('username') || '';
  }
  getMachineDetails(id: number) {
    this.mesService.getMachineDetails(id)
      .subscribe(data => {
        this.machine = data;
      }, error => console.log(error));
  }
  updateMachine() {
    this.machine.name = this.machine.name.toLowerCase();
    this.machine.pannes = this.pannes.filter(panne => this.selectedPannes.includes(panne.id));
    this.mesService.editMachine(this.machine.id, this.machine).subscribe(
      updatedMachine => {
        this.mesService.addPannetoMachine(this.machine.id, this.selectedPannes, this.username).subscribe(
          () => this.successMessage = "Machine modifiée avec succès!",
          error => this.errorMessage = 'Erreur lors de la modification de la machine'
        );
      },
      error => this.errorMessage = 'Erreur lors de la modification de la machine'
    );
  }
 
  getPannesList(): void {
    this.mesService.getPanneList().subscribe({
      next: (data) => {
        this.pannes = data;
      },
      error: (error) => {
        console.error('Get pannes error', error);
      }
    });
  }

  onSubmit() {
    this.updateMachine();
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
