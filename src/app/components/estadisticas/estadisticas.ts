import { Component, inject } from '@angular/core';
import { Analytics } from '../../caption/interfaces/interface';
import { CaptionService } from '../../caption/services/caption-service';

@Component({
  selector: 'app-estadisticas',
  imports: [],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.scss',
})
export class Estadisticas {
  captionS: CaptionService = inject(CaptionService);
  analytics: Analytics = this.captionS.loadAnalytics();
}
