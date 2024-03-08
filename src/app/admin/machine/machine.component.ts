import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';


@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [RouterModule,NavbarComponent],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent {

}
