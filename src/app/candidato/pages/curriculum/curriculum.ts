import { Component, inject, signal, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AspirantesService } from '../../services/aspirantes.service';
import { CV } from '../../interfaces/cv.interfaces';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Skeletons } from './components/skeletons/skeletons';
import { AddExperienceDialog } from './dialogs/work-experience/add/add-experience-dialog';
import { EditExperienceDialog } from './dialogs/work-experience/edit/edit-experience-dialog';
import { AddEducationDialog } from './dialogs/education/add/add-education-dialog';
import { LanguagesDialog } from './dialogs/languages/languages-dialog';

@Component({
  selector: 'app-curriculum',
  imports: [
    AvatarModule,
    TimelineModule,
    ButtonModule,
    CardModule,
    TranslatePipe,
    AddExperienceDialog,
    EditExperienceDialog,
    AddEducationDialog,
    Skeletons,
    LanguagesDialog,
  ],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss',
})
export class Curriculum {
  /* Injección de servicio */
  aspirantesService = inject(AspirantesService);
  messageService = inject(MessageService);

  @ViewChild(LanguagesDialog)
  languagesDialog!: LanguagesDialog;

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
