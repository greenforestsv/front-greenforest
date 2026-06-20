import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef,
  input,
  effect,
  computed,
} from '@angular/core';
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
    @if (data) {
      <div class="relative">
        <p-chart type="doughnut" [data]="data" [options]="options"></p-chart>
        <span class="font-bold absolute top-1/2 right-[52.5%] text-lg lg:text-xl"
          >Total {{ total() }}</span
        >
      </div>
    }
  `,
})
export class DoughnutChart implements OnInit {
  chartData = input.required<ChartItem[]>();
  tituloTooltip = input<string>();

  total = computed(() => {
    return this.chartData().reduce((acc, item) => acc + item.value, 0);
  });

  data: any;
  options: any;

  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

  constructor() {
    // Cada vez que cambie el valor del input, recalculamos el gráfico automáticamente
    effect(() => {
      const items = this.chartData();
      const tooltip = this.tituloTooltip();

      if (items && items.length > 0) {
        const labels = items.map((item) => item.label);
        const values = items.map((item) => item.value);
        const colors = items.map((item) => item.color);

        this.initChart(values, labels, colors, tooltip);
      }
    });
  }

  ngOnInit() {}

  initChart(numericData: number[], labels: string[], colors: string[], tituloTooltip?: string) {
    if (isPlatformBrowser(this.platformId)) {
      const textColor = '#000000';

      this.data = {
        labels: labels,
        datasets: [
          {
            borderWidth: 0,
            data: numericData,
            backgroundColor: colors,
          },
        ],
      };

      this.options = {
        cutout: '60%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: textColor,
              usePointStyle: true,
              font: { weight: '500' },
            },
          },
          tooltip: {
            usePointStyle: true,
            borderWidth: 0,
            callbacks: {
              label: function (context: any) {
                return ` ${context.label}: ${context.raw} ${tituloTooltip || ''}`;
              },
              labelColor: function (context: any) {
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
      };

      this.cd.markForCheck();
    }
  }
}
