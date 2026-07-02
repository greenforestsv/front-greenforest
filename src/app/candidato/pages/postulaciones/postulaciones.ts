import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-postulaciones',
  imports: [TranslatePipe],
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

  postulaciones = signal([
    {
      id: 1,
      name: 'Growth Marketing Manager',
      company: 'LinkX Retail',
      status: 'A',
    },
    {
      id: 2,
      name: 'Product Marketing SaaS',
      company: 'GreenLabs',
      status: 'A',
    },
    {
      id: 3,
      name: 'BI Lead',
      company: 'Central Analytics',
      status: 'A',
    },
    {
      id: 4,
      name: 'AI Automation Specialist',
      company: 'NovaTech',
      status: 'P',
    },
    {
      id: 5,
      name: 'Business Intelligence Lead',
      company: 'GreenLabs',
      status: 'P',
    },
    {
      id: 6,
      name: 'Marketing Data Strategist',
      company: 'Kodigo',
      status: 'E',
    },
    {
      id: 7,
      name: 'Consultora AI Ops',
      company: 'Nueva Visión',
      status: 'O',
    },
  ]);

  status(status: string) {
    return computed(() => this.postulaciones().filter((p) => p.status === status));
  }

  aplicados = this.status('A');
  preseleccion = this.status('P');
  entrevista = this.status('E');
  oferta = this.status('O');
}
