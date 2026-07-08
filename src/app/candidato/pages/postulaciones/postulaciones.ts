import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PostulacionesService } from '../../services/postulaciones.service';
import { Postulacion } from '../../interfaces/postulacion.interface';

@Component({
  selector: 'app-postulaciones',
  imports: [TranslatePipe, SkeletonModule],
  templateUrl: './postulaciones.html',
  styleUrl: './postulaciones.scss',
})
export class Postulaciones {
  /*   data = signal<ChartData<'bar'>>({
    labels: ['Total'],
    datasets: [
      {
        label: 'Postulados',
        data: [120],
        backgroundColor: '#4CAF50',
        barThickness: 12,
      },
      {
        label: 'Entrevistados',
        data: [45],
        backgroundColor: '#FFC107',
        barThickness: 12,
      },
      {
        label: 'Contratados',
        data: [12],
        backgroundColor: '#2196F3',
        barThickness: 12,
      },
    ],
  });

  options = signal<ChartOptions<'bar'>>({
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
        },
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          labelPointStyle: () => ({
            pointStyle: 'circle',
            rotation: 0,
          }),
        },
      },
    },
  }); */

  items = Array.from({ length: 4 });

  /* Injección de servicio */
  private postulacionesService = inject(PostulacionesService);

  /* Estados iniciales */
  postulaciones = signal<Postulacion[]>([]);
  loading = signal(true);

  /* Constructor donde obtenemos la data */
  constructor() {
    this.postulacionesService.getPostulaciones().subscribe((postulaciones) => {
      this.postulaciones.set(postulaciones);
      this.loading.set(false);
    });
  }

  /* Contadores */
  countStatus(status: string) {
    return computed(() => this.postulaciones().filter((p) => p.status === status));
  }

  aplicados = this.countStatus('A');
  preseleccion = this.countStatus('P');
  entrevista = this.countStatus('E');
  oferta = this.countStatus('O');
}
