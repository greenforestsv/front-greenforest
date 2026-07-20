import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { forest, surface } from '../../../themes/palette';

@Component({
  selector: 'app-line-chart',
  template: ` <p-chart type="line" [data]="data" [options]="options" class="h-[15rem]" /> `,
  standalone: true,
  imports: [ChartModule],
})
export class LineChart implements OnInit {
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  /* configService = inject(AppConfigService);
  designerService = inject(DesignerService); */

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const textColor = 'black';
      const textColorSecondary = 'black'; //numeros, meses
      const surfaceBorder = surface[300]; //grid

      this.data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'Visitas',
            data: [18, 38, 30, 9, 46, 17, 40],
            fill: false,
            borderColor: forest.lite,
            tension: 0.4,
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: textColor,
            },
          },
          tooltip: {
            usePointStyle: true,
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
      //this.cd.markForCheck();
    }
  }
}
