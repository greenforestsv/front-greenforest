import { Component, inject, signal } from '@angular/core';
import { AspirantesService } from '../../services/aspirantes.service';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarPerfilDialog } from './components/editar-perfil-dialog/editar-perfil-dialog';
import { CV } from '../../interfaces/cv.interfaces';
import { PrivateAspirant } from '../../interfaces/aspirant.interfaces';
import { SkeletonModule } from 'primeng/skeleton';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CustomAvatar } from '../../../shared/components/custom-avatar/custom-avatar';
import { FormatDatePipe } from '../../../shared/pipes/format-date.pipe';
import { GenderPipe } from '../../../shared/pipes/gender.pipe';
import { FullNamePipe } from '../../../shared/pipes/full-name.pipe';

@Component({
  selector: 'app-perfil-candidato',
  imports: [
    AvatarModule,
    CustomAvatar,
    ButtonModule,
    FormsModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
    EditarPerfilDialog,
    SkeletonModule,
    EmptyState,
    FormatDatePipe,
    GenderPipe,
    FullNamePipe,
  ],
  templateUrl: './perfil-candidato.html',
  styleUrl: './perfil-candidato.scss',
})
export class PerfilCandidato {
  /* INJECCIÓN DE SERVICIOS */
  aspirantsService = inject(AspirantesService);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);

  /* ESTADOS SIGNAL */
  cv = signal<CV | null>(null);
  aspirant = signal<PrivateAspirant | null>(null);
  profilePercentage = signal(86);
  loading = signal(false);

  readonly switchForm = this.fb.group({
    perfil_basico_publico: [true],
    salario_pretendido: [true],
    historial_detallado: [false],
  });

  constructor() {
    this.loadCV();
    this.loadAspirant();
  }

  loadCV() {
    this.loading.set(true);
    /* OBTENCIÓN DE DATOS */
    this.aspirantsService
      .getCV()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          console.log({ cv: data });
          this.cv.set(data);
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

  loadAspirant() {
    this.loading.set(true);
    /* OBTENCIÓN DE DATOS */
    this.aspirantsService
      .getAspirantMe()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          console.log({ aspirant: data });
          this.aspirant.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de candidato',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
