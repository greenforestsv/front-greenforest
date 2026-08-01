import { Component, inject, signal } from '@angular/core';
import { AspirantesService } from '../../services/aspirantes.service';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ChartDoughnut } from './components/chart-doughnut/chart-doughnut';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarPerfilDialog } from './components/editar-perfil-dialog/editar-perfil-dialog';
import { CV } from '../../interfaces/cv.interfaces';

@Component({
  selector: 'app-perfil-candidato',
  imports: [
    AvatarModule,
    ChartDoughnut,
    TranslatePipe,
    ButtonModule,
    FormsModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
    EditarPerfilDialog,
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
  perfil = signal<CV | null>(null);
  profilePercentage = signal(86);
  loading = signal(false);

  readonly switchForm = this.fb.group({
    perfil_basico_publico: [true],
    salario_pretendido: [true],
    historial_detallado: [false],
  });

  constructor() {
    this.loading.set(true);
    /* OBTENCIÓN DE DATOS */
    this.aspirantsService
      .getCV()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.perfil.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de perfil',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
