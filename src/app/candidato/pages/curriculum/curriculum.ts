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
import { EditExperienceDialog } from './components/edit-experience-dialog/edit-experience-dialog';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

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
    EditExperienceDialog,
  ],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss',
})
export class Curriculum {
  /* Injección de servicio */
  aspirantesService = inject(AspirantesService);
  messageService = inject(MessageService);

  /* Estados iniciales */
  cv = signal<CV | null>(null);
  loading = signal(false);

  /* Constructor */
  constructor() {
    this.loadCV();
  }

  loadCV() {
    this.loading.set(true);

    this.aspirantesService
      .getCV()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (cv) => {
          this.cv.set(cv);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de curriculum',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
