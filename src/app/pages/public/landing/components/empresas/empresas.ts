import { Component, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Analytics } from '../../../../../caption/interfaces/interface';
import { CaptionService } from '../../../../../caption/services/caption-service';

@Component({
  selector: 'app-empresas',
  imports: [CarouselModule],
  templateUrl: './empresas.html',
  styleUrl: './empresas.scss',
})
export class Empresas {
  captionS: CaptionService = inject(CaptionService);
  analytics: Analytics = this.captionS.loadAnalytics();

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
