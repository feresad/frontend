import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { mesService } from '../../messervice';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';


@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent implements OnInit{
  username: String = '';
  role: string = '';
  pieChart: Chart = new Chart({});
  constructor(private mesService: mesService, private router :Router) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    this.mesService.getMachineStatistiques().subscribe((statistiques) => {
      const enMarche = statistiques['enMarche'];
      const enPanne = statistiques['enPanne'];
      const pieChartConfig: Options = {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Graphe des Machines en Panne et En Marche',
        },
        series: [
          {
            type: 'pie',
            name: 'Machines',
            data: [
              { name: 'En Marche', y: enMarche ,color : '#99ff99'},
              { name: 'En Panne', y: enPanne ,color : '#ffcc99'},
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
