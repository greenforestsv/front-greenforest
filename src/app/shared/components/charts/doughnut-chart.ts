import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, input, computed } from '@angular/core';
import { ChartModule } from 'primeng/chart';

export interface ChartItem {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [ChartModule],
  template: `
    @if (chartConfig(); as config) {
      <div class="relative">
        <p-chart type="doughnut" [data]="config.data" [options]="config.options"></p-chart>
        <span class="font-bold absolute top-1/2 right-[52.5%] text-lg lg:text-xl">
          Total {{ total() }}
        </span>
      </div>
    }
  `,
})
export class DoughnutChart {
  private platformId = inject(PLATFORM_ID);

  // 1. Inputs reactivos
  chartData = input.required<ChartItem[]>();
  tituloTooltip = input<string>('');

  // 2. Estado derivado simple
  total = computed(() => this.chartData().reduce((acc, item) => acc + item.value, 0));

  // 3. El secreto: Todo el gráfico es una única señal computada reactiva
  chartConfig = computed(() => {
    // Si estamos en el servidor (SSR), evitamos procesar Chart.js para que no rompa
    if (!isPlatformBrowser(this.platformId)) return null;

    const items = this.chartData();
    const tooltipText = this.tituloTooltip();

    if (!items || items.length === 0) return null;

    const labels = items.map((item) => item.label);
    const values = items.map((item) => item.value);
    const colors = items.map((item) => item.color);

    return {
      data: {
        labels: labels,
        datasets: [
          {
            borderWidth: 0,
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        cutout: '60%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#000000',
              usePointStyle: true,
              font: { weight: '500' },
            },
          },
          tooltip: {
            usePointStyle: true,
            borderWidth: 0,
            callbacks: {
              label: (context: any) => ` ${context.label}: ${context.raw} ${tooltipText}`,
              labelColor: (context: any) => {
                const backgroundColor = context.dataset.backgroundColor[context.dataIndex];
                return {
                  borderColor: backgroundColor,
                  backgroundColor: backgroundColor,
                  borderWidth: 0,
                };
              },
            },
          },
        },
        maintainAspectRatio: false,
      },
    };
  });
}
