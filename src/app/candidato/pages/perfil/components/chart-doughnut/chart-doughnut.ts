import { Component, effect, inject, input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { forest } from '../../../../../themes/palette';

@Component({
  template: `
    <div class="flex justify-center">
      <div class="relative size-56">
        <p-chart type="doughnut" [data]="data" [options]="options" class="w-full" />
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span class="text-3xl font-bold"> {{ percentage() }}% </span>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ChartModule],
  selector: 'app-chart-doughnut',
})
export class ChartDoughnut {
  data: any;
  options: any;

  platformId = inject(PLATFORM_ID);

  percentage = input.required<number>();

  constructor() {
    effect(() => {
      this.initChart(this.percentage());
    });
  }

  initChart(percentage: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.data = {
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: [forest.lite, '#cedbca'],
          hoverBackgroundColor: [forest.lite, '#cedbca'],
          borderWidth: 0,
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    };
  }
}
