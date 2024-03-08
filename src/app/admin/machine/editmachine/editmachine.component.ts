import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mesService } from '../../../messervice';
import { Machine } from '../../../machine';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-editmachine',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,NavbarComponent],
  templateUrl: './editmachine.component.html',
  styleUrl: './editmachine.component.css'
})
export class EditmachineComponent implements OnInit{
  machine: Machine = new Machine();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private mesService: mesService,private route: ActivatedRoute) {}
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

}
