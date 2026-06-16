import { Component, inject } from '@angular/core';
import { FlashData } from '../../components/flash-data/flash-data';
import { ButtonModule } from 'primeng/button';
import { TestimoniosComponent } from '../../../components/testimonios/testimonios';
import { MisionVision } from '../../../components/mision-vision/mision-vision';
import { PilaresFundamentales } from '../../../components/pilares-fundamentales/pilares-fundamentales';
import { Hero } from '../../../components/hero/hero';
import { Empresas } from '../../../components/empresas/empresas';
import { Analytics } from '../../interfaces/interface';
import { CaptionService } from '../../services/caption-service';

@Component({
  selector: 'app-landing',
  imports: [
    FlashData,
    ButtonModule,
    Hero,
    TestimoniosComponent,
    MisionVision,
    PilaresFundamentales,
    Empresas,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  captionS: CaptionService = inject(CaptionService);
  analytics: Analytics = this.captionS.loadAnalytics();
  constructor() {}
}
