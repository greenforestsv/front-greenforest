import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card';
import { FlashData } from '../../components/flash-data/flash-data';
import { generalService } from '../../../shared/services/general';
import { CaptionService } from '../../services/caption-service';
import { CarouselModule } from 'primeng/carousel'
import { ButtonModule } from 'primeng/button';
import { Analytics } from '../../interfaces/interface';

@Component({
  selector: 'app-landing',
  imports: [Card, FlashData, CarouselModule, ButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  generalService: generalService = inject(generalService)
  captionS: CaptionService = inject(CaptionService)
  analytics: Analytics = this.captionS.loadAnalytics()
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  constructor(){}
}
