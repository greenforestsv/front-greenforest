import { Component } from '@angular/core';
import { DoughnutChart } from '../../../shared/components/charts/doughnut-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DoughnutChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  misPostulacionesData = [
    { label: 'Enviadas', value: 18, color: '#1e4b38' },
    { label: 'CV Visto', value: 7, color: '#2e7d53' },
    { label: 'En Entrevista', value: 4, color: '#a8c5a3' },
    { label: 'Finalista', value: 2, color: '#d8e3dc' },
  ];
  tituloTooltip = 'postulaciones';
}
