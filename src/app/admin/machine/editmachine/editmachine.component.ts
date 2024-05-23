import { Component, OnInit } from '@angular/core';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Panne } from '../../../panne';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  machineForm: FormGroup;
  constructor(private mesService: mesService,private route: ActivatedRoute,private router : Router,private fb : FormBuilder) {
    this.machineForm = this.fb.group({
      name: ['', Validators.required],
      etat: [false],
      pannes: [[],Validators.required],
    });
  }
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
        this.machineForm.patchValue({
          name: this.machine.name,
          etat: this.machine.etat,
          pannes: this.machine.pannes.map(panne => panne.id)
        });
      }, error => console.log(error));
  }
  updateMachine() {
    this.machine.name = this.machineForm.get('name')?.value.toLowerCase();
    this.machine.etat = this.machineForm.get('etat')?.value;
    if (!this.machine.etat) {
      this.selectedPannes = this.machineForm.get('pannes')?.value || [];
      if (this.selectedPannes.length === 0) {
        this.errorMessage = 'Veuillez sélectionner au moins une panne.';
        return; 
      }
      this.machine.pannes = this.pannes.filter(panne => this.selectedPannes.includes(panne.id));
    } else {
      // Clear pannes if machine is running
      this.machine.pannes = []; 
    }
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
    if(this.machineForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }
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
isAdmin(): boolean {
  const roles = JSON.parse(localStorage.getItem('role') || '[]');
  return roles.includes('ADMIN');
}

}
