import { Component, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { GetVacanteDto } from '../../../../../core/interfaces/vacantes.interfaces';
import { FormatDatePipe } from '../../../../../shared/pipes/format-date.pipe';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PostulacionesService } from '../../../../../core/services/postulaciones.service';
import { CurrencyFormatPipe } from '../../../../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-job-detail',
  imports: [ButtonModule, AvatarModule, FormatDatePipe, CurrencyFormatPipe],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss',
})
export class JobDetail {
  readonly job = input.required<GetVacanteDto>();

  readonly applying = signal(false);

  private readonly postulacionesService = inject(PostulacionesService);
  private readonly messageService = inject(MessageService);

  applyToJob(): void {
    this.applying.set(true);

    this.postulacionesService
      .applyToJob(this.job().id)
      .pipe(finalize(() => this.applying.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Postulación exitosa',
            detail: 'Te postulaste a esta vacante.',
            life: 5000,
          });
        },

        error: (err: { error?: { message?: string } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al postularte',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
