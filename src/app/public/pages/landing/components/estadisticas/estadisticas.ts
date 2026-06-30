import { Component, inject, signal } from '@angular/core';
import { Analytics } from '../../../../../caption/interfaces/interface';
import { CaptionService } from '../../../../../caption/services/caption-service';

@Component({
  selector: 'app-estadisticas',
  imports: [],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
})
export class Estadisticas {
  captionS: CaptionService = inject(CaptionService);
  analytics: Analytics = this.captionS.loadAnalytics();

  estadisticas = signal([
    {
      title: 'Empresas activas<br />en la plataforma',
      number: '500+',
    },
    {
      title: 'Candidatos<br />registrados',
      number: '25k+',
    },
    {
      title: 'Match exitoso<br />basado en datos',
      number: '92%',
    },
    {
      title: 'Selección<br />más rápida',
      number: '3x',
    },
  ]);
}
