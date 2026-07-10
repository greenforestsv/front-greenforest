import { Component, inject, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AspirantesService } from '../../services/aspirantes.service';
import { CV } from '../../interfaces/cv.interfaces';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { AddExperienceDialog } from './components/add-experience-dialog/add-experience-dialog';

@Component({
  selector: 'app-curriculum',
  imports: [
    AvatarModule,
    TimelineModule,
    ButtonModule,
    CardModule,
    SkeletonModule,
    TranslatePipe,
    AddExperienceDialog,
  ],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss',
})
export class Curriculum {
  /* Injección de servicio */
  aspirantesService = inject(AspirantesService);

  /* Estados iniciales */
  cv = signal<CV | null>(null);
  loading = signal(false);

  /* Constructor */
  constructor() {
    this.loadCV();
  }

  loadCV() {
    this.loading.set(true);

    this.aspirantesService.getCV().subscribe((cv) => {
      this.cv.set(cv);
      this.loading.set(false);
    });
  }
}
