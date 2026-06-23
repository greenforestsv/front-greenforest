import { Component } from '@angular/core';
import { DoughnutChart } from '../../../shared/components/charts/doughnut-chart';
import { LineChart } from '../../../shared/components/charts/line-chart';
import { forest } from '../../../themes/palette';
import { ListaOfertas } from './components/lista-ofertas/lista-ofertas';
import { AvatarModule } from 'primeng/avatar';
import { Entrevistas } from './components/entrevistas/entrevistas';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DoughnutChart, LineChart, ListaOfertas, AvatarModule, Entrevistas, Entrevistas],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  misPostulacionesData = [
    { label: 'Enviadas', value: 18, color: forest.mid },
    { label: 'CV Visto', value: 7, color: forest.lite },
    { label: 'En Entrevista', value: 4, color: forest.pale },
    { label: 'Finalista', value: 2, color: '#d8e3dc' },
  ];
  tituloTooltip = 'postulaciones';
}
