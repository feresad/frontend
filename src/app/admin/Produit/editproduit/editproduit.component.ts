import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mesService } from '../../../messervice';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './editproduit.component.html',
  styleUrl: './editproduit.component.css'
})
export class EditProduitComponent implements OnInit {
  produit: Produit = new Produit();
  modi:  boolean | null = null;
// Edit Produit
 
  constructor(private mesService : mesService, private route: ActivatedRoute, private router : Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getProduitDetails(id);
    });
  }
  getProduitDetails(id: number): void {
    this.mesService.getProduit(id).subscribe((data: Produit) => {
      this.produit = data;
      console.log(this.produit);
    });
  }

  editProduit(): void {
    this.mesService.editProduit(this.produit.id, this.produit)
      .subscribe(data => {
        console.log(data);
        this.modi = true;
      },
      error => console.log(error));
      this.modi = false;
  }
  onSubmit() {
    this.editProduit();
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
