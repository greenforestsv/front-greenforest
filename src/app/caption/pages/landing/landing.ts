import { Component, inject } from '@angular/core';
import { FlashData } from '../../components/flash-data/flash-data';
import { CaptionService } from '../../services/caption-service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Analytics } from '../../interfaces/interface';
import { TestimoniosComponent } from '../../../components/testimonios/testimonios';
import { MisionVision } from '../../../components/mision-vision/mision-vision';
import { PilaresFundamentales } from '../../../components/pilares-fundamentales/pilares-fundamentales';
import { Hero } from '../../../components/hero/hero';

@Component({
  selector: 'app-landing',
  imports: [
    FlashData,
    CarouselModule,
    ButtonModule,
    Hero,
    TestimoniosComponent,
    MisionVision,
    PilaresFundamentales,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
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

  constructor() {}
}
