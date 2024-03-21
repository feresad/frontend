import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editmachine',
  templateUrl: './editmachine.component.html',
  styleUrl: './editmachine.component.css'
})
export class EditmachineComponent implements OnInit{
  machine: Machine = new Machine();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private mesService: mesService,private route: ActivatedRoute,private router : Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getMachineDetails(id);
    });
  }
  getMachineDetails(id: number) {
    this.mesService.getMachineDetails(id)
      .subscribe(data => {
        console.log(data);
        this.machine = data;
      }, error => console.log(error));
  }
  updateMachine() {
    this.mesService.editMachine(this.machine.id, this.machine)
      .subscribe(data => {
        console.log(data);
        this.successMessage = "Machine modifiée avec succès !";
        this.errorMessage = '';
      }, error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.successMessage = 'Error lors de la modification de la machine';
      });
  }
  onSubmit() {
    this.updateMachine();
  }
  logout(): void {
    this.mesService.logout().subscribe({
      next: (data) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
}
}
