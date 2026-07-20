import { Component, inject } from '@angular/core';
import { Card } from '../card/card';
import { generalService } from '../../../../../shared/services/general';

@Component({
  selector: 'pilares-fundamentales',
  imports: [Card],
  templateUrl: './pilares-fundamentales.html',
  styleUrl: '../../landing.scss',
})
export class PilaresFundamentales {
  generalService: generalService = inject(generalService);
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
