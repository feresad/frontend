import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports:[RouterModule,NavbarComponent],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent {

}
