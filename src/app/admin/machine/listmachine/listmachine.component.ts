import { Component } from '@angular/core';
import { Machine } from '../../../machine';
import { mesService } from '../../../messervice';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listmachine',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './listmachine.component.html',
  styleUrl: './listmachine.component.css'
})
export class ListmachineComponent {
  machines: Machine[]=[];
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
 



}
