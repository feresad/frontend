import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../../messervice';
import { Options } from 'highcharts';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit{
  username: String = '';
  role: string = '';
  pieChart: Chart = new Chart({});
ngOnInit(): void {
  this.username = localStorage.getItem('username') || '';
  this.mesService.getProduitFiniStatistiques().subscribe((statistiques) => {
    const terminer = statistiques['terminer'];
    const enCours = statistiques['enCours'];
    const aucunTraitement = statistiques['Aucun traitement'];
    const pieChartConfig: Options = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Nombre des Produits Finis par Etat',
      },
      series: [
        {
          type: 'pie',
          name: 'Produits Finis',
          data: [
            { name: 'Terminer', y: terminer ,color : '#99ff99'},
            { name: 'Aucun traitement', y: aucunTraitement ,color : '#ffcc99'},
            { name: 'Au Cours', y: enCours ,color : '#66b3ff'}
          ],
        },
      ],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
          },
        },
      },
    };

    this.pieChart = new Chart(pieChartConfig);
  });
}

  constructor(private mesService: mesService, private router :Router) { }
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
